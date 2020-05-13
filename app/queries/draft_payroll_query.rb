class DraftPayrollQuery
  attr_reader :start_date, :end_date, :results

  def initialize(start_date, end_date)
    @start_date = start_date
    @end_date = end_date
  end

  def call
    sql =
      "
      SELECT
        c.id as contractor_id,
        CONCAT(c.first_name, ' ', c.last_name) as full_name,
        c.first_name,
        c.last_name,
        c.hourly_rate,
        COALESCE(hpc.regular_hours, 0) as regular_hours,
        COALESCE(hpc.overtime_hours, 0) as overtime_hours,
        COALESCE(hpc.days_worked, 0) as days_worked,
        COALESCE(ca.total, 0)::FLOAT as total_ca
      FROM contractors c
      LEFT JOIN (
        SELECT c.id as contractor_id
        , SUM(
          CASE 
            WHEN p.cash_advance = true THEN p.amount
            ELSE p.amount * -1
          END
        ) as total
        FROM payouts p
        JOIN contractors c 
          ON c.id = p.contractor_id
        GROUP BY c.id
      ) ca
      ON ca.contractor_id = c.id
      LEFT JOIN (
        SELECT c.id as contractor_id
          , CONCAT(c.first_name, ' ', c.last_name) as full_name
          , COUNT(a.id) as days_worked
          , SUM(a.regular_hours) as regular_hours
          , SUM(a.overtime_hours) as overtime_hours
        FROM attendances a
        JOIN contractors c
          ON c.id = a.contractor_id
        WHERE a.time_in_at >= '#{start_date.strftime('%F %T')}'
          AND a.time_in_at <= '#{end_date.strftime('%F %T')}'
        GROUP BY c.id
      ) hpc
      ON hpc.contractor_id = c.id
    "

    @results ||= ActiveRecord::Base.connection.exec_query(sql, 'SQL').to_a
  end
end
