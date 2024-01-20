class FilesController < ApplicationController
  protect_from_forgery

  def upload
    uploaded_file = params[:file]

    if uploaded_file
      section_name = uploaded_file.original_filename
      lines = []

      sq_list = []
      in_sq = false
      sq = ''
      sq_md = ''
      sq_ans = ''

      File.open(uploaded_file.tempfile, 'r') do |file|
        skip_lines = false
        md_flag = false
        file.each_line do |line|
          if skip_lines == true
            next
          end

          cleaned_line = line.gsub("\t", '    ')

          if cleaned_line =~ /\/\/\[sq\].*/
            if sq.length == 0
              sq += cleaned_line.gsub(/\/\/\[sq\]/, '').lstrip
            else
              sq_list << [sq, sq_md, sq_ans]
              sq, sq_md, sq_ans = '', '', ''
              sq += cleaned_line.gsub(/\/\/\[sq\]/, '').lstrip
            end
          elsif cleaned_line =~ /\/\*/
            if sq.length != 0
              md_flag = true
            else
              render json: { error: 'Error: [sq] tag not found before /*' }, status: :unprocessable_entity
              return
            end
          elsif cleaned_line =~ /\*\//
            if sq.length != 0
              md_flag = false
            else
              render json: { error: 'Error: [sq] tag not found before */' }, status: :unprocessable_entity
              return
            end
          elsif cleaned_line =~ /return 0;/
            skip_lines = true

          else
            if sq.length != 0
              if md_flag == true
                sq_md += cleaned_line.lstrip
              else
                sq_ans += cleaned_line
              end
            else
              next
            end
          end
        end
      end

      if sq.length > 0
        sq_list << [sq, sq_md, sq_ans]
      end

      sq_list.each do |sq|
        sq_ans = sq[2]
        sq_lines = sq_ans.split("\n")
        spaces_from_first = count_spaces_until_non_space(sq_lines[0])
      
        # 各行の最後に \n を追加
        sq_lines = sq_lines.map { |line| line[spaces_from_first..-1] + "\n" }
      
        # sq[2] を更新
        sq[2] = sq_lines.join
      end
      
      
      render json: { section_name: section_name, sq_list: sq_list }
    else
      render json: { error: 'No file uploaded' }, status: :unprocessable_entity
    end
  end

  private

  def count_spaces_until_non_space(text)
    count = 0
    text.each_char do |char|
      break if char != ' '
      count += 1
    end
    count
  end
end
