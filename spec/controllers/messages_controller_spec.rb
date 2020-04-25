require 'rails_helper'

describe MessagesController do
  let(:params) {{group_id: group.id, user_id: user.id, message: attributes_for(:message)}}

  describe '#index' do
    context 'ログインしている場合' do
      before do
        login user
        get :index, params: {group_id: group.id}
      end

      it '@messageに期待した値が入っていること' do
        expect(assigns(:message)).to be_a_new(Message) 
      end

      it '@groupに期待した値が入っていること' do
        expect(assigns(:group)).to eq group
      end

      it 'index.html.erbに遷移すること' do
        get :index
        expect(response).to render_template :index
      end
    end

    context 'ログインしていない場合' do
      before do
        get :index, params: {group_id: group.id}
      end
      it '意図したビューにリダイレクトできているか' do
        get :index
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do
    context 'ログインしている場合' do
      before do
        login user
      end

      context '保存に成功した場合' do
        subject {
          post :create,
          params: params
        }
        it 'メッセージの保存ができているか' do
          expect(subject).to eq change(Message, :count).by(1)
        end

        it '意図した画面に遷移しているか' do
          subject
          expect(response).to redirect_to(group_messages_path(group))          
        end
      end

      context '保存に失敗した場合' do
        let(:invalid_params) {{group_id: group.id, user_id: user.id, message: attributes_for(:message, cotent: nill, image: nill)}}
        subject{
          post :create,
          params: invalid_params
        }
        it 'メッセージの保存は行われなかったか' do
          subject
          expect(subject).not_to eq change(Message, :count)
        end

        it '意図したビューが描画されているか' do
          subject
          expect(response).to render_template :index
        end
      end
    end



    context 'ログインしていない場合' do
      before do
        get :create, params: params
      end

      it '意図した画面にリダイレクトできているか' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
