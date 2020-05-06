class DatatableQuery
  DEFAULT_PAGE = 1
  DEFAULT_PER_PAGE = 20

  attr_reader :relation, :order, :page, :per_page

  def initialize(relation, params)
    @relation = relation
    @page = params.fetch(:page, DEFAULT_PAGE)
    @per_page = params.fetch(:per_page, DEFAULT_PER_PAGE)
    @order = params.fetch(:order, { id: 'asc' })
  end

  def call
    @relation = orderer
    @relation = paginator
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
