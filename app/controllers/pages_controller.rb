class PagesController < ApplicationController
  include CurrentUserConcern
  def index

  end

  def get_step
    @step = params[:step_id]
    render partial: "layouts/step#{@step}"
  end

  def fetch_login_form
    @html_content = render_to_string partial: "layouts/login_form"
    render json: { html_content: @html_content }
  end

  def fetch_registration_form
    @html_content = render_to_string partial: "layouts/registration_form"
    render json: { html_content: @html_content }
  end
end
