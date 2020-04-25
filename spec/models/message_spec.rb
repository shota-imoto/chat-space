require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    it 'textとimageがあるときにデータが登録されるか' do
      message = build(:message)
      expect(message).to be_valid
    end

    it 'textがなくimageがあるときにデータが登録されるか' do
      message = build(:message, text: nill)
      expect(message).to be_valid   
    end

    it 'textはあるがimageがないときにデータが登録されるか' do
      message = build(:message, image: nill)
      expect(message).to be_valid
    end
    
    it 'textもimageもないときにデータが登録されない' do
      message = build(:message, text: nill, image: nill)
      message.valid?
      expect(message.errors[:text]).to include("を入力してください")
    end

    it 'group_idがないときにデータが登録されない' do
      message = build(:message, group_id: nill)
      message.valid?
      expect(message.errors[:group]).to include("を入力してください")
    end
    
    it 'user_idがないときにデータが登録されない' do
      message = build(:message, user_id: nill)
      message.valid?
      expect(message.errors[:user]).to include("を入力してください")
    end
  end
end