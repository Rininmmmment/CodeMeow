# ruby3.1イメージを使用
FROM ruby:3.1

# postgeqsqlとvimをインストール
RUN apt-get update -qq && apt-get install -y postgresql-client vim

# タイムゾーンを設定
ENV TZ=Asia/Tokyo

# 作業ディレクトリを設定
WORKDIR /myapp

# ローカルのファイルをコンテナへコピー
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock

# bundlerを使ってGemfileからgemをインストール
RUN bundle install

# コンテナ起動時に毎回実行されるスクリプトentrypoint.shを追加
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# コンテナがリッスンするポート番号を設定
EXPOSE 8000

# railsを実行
CMD ["rails", "server", "-b", "0.0.0.0"]