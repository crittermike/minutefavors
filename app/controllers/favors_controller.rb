class FavorsController < ApplicationController
  before_filter :authenticate_user!, :only => [:new, :edit, :create, :update, :destroy]
  before_filter :verify_owned_favor, :only => [:edit, :destroy]
  before_filter :add_sorting, :only => [:index, :tag]

  # GET /favors
  # GET /favors.json
  def index
    @favors = Favor.order(@order).where('status' => 'open')

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @favors }
    end
  end

  # GET /favors/1
  # GET /favors/1.json
  def show
    @favor = Favor.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @favor }
    end
  end

  # GET /favors/tags/tagname
  # GET /favors/tags/tagname.json
  def tag
    @favors = Favor.tagged_with(params[:tag], :order => @order).where('status' => 'open')
    @tag = params[:tag]

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @favors }
    end
  end

  # GET /favors/new
  # GET /favors/new.json
  def new
    @favor = Favor.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @favor }
    end
  end

  # GET /favors/1/edit
  def edit
  end

  # POST /favors
  # POST /favors.json
  def create
    @favor = Favor.new(params[:favor])
    @favor.user = current_user
    @favor.status = 'open'

    respond_to do |format|
      if @favor.save
        # Decrement the points from the current user's points total.
        current_user.points = current_user.points - @favor.points
        current_user.save
        format.html { redirect_to @favor, notice: 'Favor was successfully created.' }
        format.json { render json: @favor, status: :created, location: @favor }
      else
        format.html { render action: "new" }
        format.json { render json: @favor.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /favors/1
  # PUT /favors/1.json
  def update
    @favor = Favor.find(params[:id])
    respond_to do |format|
      if @favor.update_attributes(params[:favor])
        if @favor.status == 'closed'
          # If the owner just accepted this favor, credit the helper with the points.
          @user = User.find(@favor.helper_id)
          @user.points = @user.points + @favor.earned
          @user.save
        end
        format.html { redirect_to @favor, notice: 'Favor was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @favor.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /favors/1
  # DELETE /favors/1.json
  def destroy
    @favor.destroy

    respond_to do |format|
      format.html { redirect_to favors_url }
      format.json { head :no_content }
    end
  end

  protected    
    def verify_owned_favor
      @favor = current_user.favors.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      redirect_to favor_path(@favor), :flash => { :alert => "You can only edit posts you created." }
    end

  protected
    def add_sorting
      if defined? params[:sort]
        sort = params[:sort]
      else
        sort = 'newest'
      end

      if sort == 'oldest'
        @order = 'created_at ASC'
      elsif sort == 'points'
        @order = 'points DESC'
      else
        @order = 'created_at DESC'
      end
    end
end
