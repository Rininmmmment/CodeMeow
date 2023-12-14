class FilesController < ApplicationController
  def upload
    uploaded_file = params[:file]

    if uploaded_file
      # ファイル名をセクション名にする
      section_name = uploaded_file.original_filename

      lines = []
      mq = '' # 大問
      sq = '' # 小問
      sq_ans = '' # 小問の答え
      sq_list = [] # 小問リスト

      File.open(uploaded_file.tempfile, 'r') do |file|
        # 問題に変換する処理
        file.each_line do |line|
          # タブを半角スペース4つに、改行を<br />に変換
          cleaned_line = line.gsub("\t", '    ')
          # cleaned_line = line.gsub("\n", '<br>')

          # //[mq]はmqに格納
          if cleaned_line =~ /\/\/\[mq\].*/
            mq += cleaned_line.gsub(/\/\/\[mq\]/, '') + '\n'

          # //[sq]はsqに格納し、次の[sq]タグが来るまでの行をsq_ansに追加する
          elsif cleaned_line =~ /\/\/\[sq\].*/
            if sq.length == 0
              sq += cleaned_line.gsub(/\/\/\[sq\]/, '')
            else
              sq_list << [sq, sq_ans]
              sq = ''
              sq_ans = ''
              sq += cleaned_line.gsub(/\/\/\[sq\]/, '')
            end

          # 以下タグがついていない行の処理
          else
            # sqに何も入っていない場合、何もしない
            if sq.length == 0
              next
            # sqに入っている場合、sqのansにする
            else
              sq_ans += cleaned_line
            end
          end
          lines << cleaned_line.chomp
        end
      end
      render json: { section_name: section_name, text: mq, sq_list: sq_list }

    else
      render json: { error: 'No file uploaded' }, status: :unprocessable_entity
    end
  end
end
