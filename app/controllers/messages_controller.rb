class MessagesController < ApplicationController
  def index
    # @messages = Message.all.include(:group)
  end

  def create
    # @message = Message.new
    # @message.Create(message_parameter)
  end

  private

  def message_parameter
    # @message.require(:message).permit(:text, :image_url).merge(group)
  end


end
