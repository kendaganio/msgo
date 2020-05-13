class DatatableQuery
  DEFAULT_PAGE = 1
  DEFAULT_PER_PAGE = 20

  attr_reader :relation, :order, :params, :page, :per_page, :filters

  def initialize(relation, params)
    @relation = relation
    @params = params
    @page = params.fetch(:page, DEFAULT_PAGE)
    @per_page = params.fetch(:per_page, DEFAULT_PER_PAGE)
    @order = params.fetch(:order, { id: 'asc' })
    @filters = params.fetch(:filters, {})
  end

  def call
    relation = filterer
    relation = orderer
    relation = paginator
  end

  def filterer
    @relation.ransack(filters).result
  end

  def orderer
    order_fragments = {}
    order.keys.map do |key|
      if order[key] == 'asc'
        order_fragments[key] = 'asc'
      elsif order[key] == 'desc'
        order_fragments[key] = 'desc'
      end
    end

    @relation.order(order_fragments)
  end

  def paginator
    @relation.page(page).per(per_page)
  end

  # {
  #   search:  {
  #     field: searchText
  #   },
  #   order: {
  #     field: direction
  #   }
  #   page,
  #   per_page
  # }
end
