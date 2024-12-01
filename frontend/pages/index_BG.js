import { useState } from 'react';
import ReactMarkdown from 'react-markdown'

export default function Home() {

  //POSTリクエストを送信
  const [input, setInput] = useState('');
  const [postResponse, setPostResponse] = useState('');
  const [theme, setTheme] = useState('');
  const [objective, setObjective] = useState('');
  const [words, setWords] = useState('');
  const [personality, setPersonality] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState(''); 

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5001/api/genblog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify({ "theme":theme, "words":words, "objective":objective }),
      body: JSON.stringify({
        "theme":theme,
        "words":words,
        "objective":objective,
        "personality":personality
      }),
    });
    console.log(JSON.stringify({ "theme":theme, "words":words, "objective":objective, "personality":personality }));
    const data = await res.json();

    //バックエンドからのレスポンスをコンソールに表示
    console.log("Backendからのお返事:", data.content);

    setPostResponse(data.content);
    setGeneratedImageUrl(data.image_url);
  };

/* ////////////////////////////////////////////////////////////////////////
// Debug
////////////////////////////////////////////////////////////////////////
  //GETリクエストを送信
  const [getResponse, setGetResponse] = useState('');

  const handleGetRequest = async () => {
    const res = await fetch('http://localhost:5000/api/hello', {
      method: 'GET',
    });
    const data = await res.json();

    // GETリクエストの結果をコンソールに表示
    console.log("GETリクエストの結果:", data.message);

    setGetResponse(data.message);
  }; */

  return (
    <div>
      <h1>BlogGenie（ブログ生成アプリ）</h1>

      <h2>テーマは何にしますか？</h2>
      <input 
        type="text" 
        value={theme} 
        onChange={(e) => setTheme(e.target.value)} 
        placeholder="テキストを入力して下さい" 
      />

      <h2>語数はどの程度にしますか？</h2>
      <input 
        type="number" 
        value={words} 
        onChange={(e) => setWords(e.target.value)} 
        placeholder="数字を入力して下さい" 
      />

      <h2>ブログの目的は何ですか？</h2>
      <select 
        value={objective} 
        onChange={(e) => setObjective(e.target.value)} 
      >
        <option value="">選択してください</option>
        <option value="情報発信">情報発信</option>
        <option value="ランキング">ランキング</option>
        <option value="アフィリエイト収益">アフィリエイト収益</option>
        <option value="コミュニティ構築">コミュニティ構築</option>
        <option value="個人日記">個人日記</option>
      </select>

      <h2>記事のスタイルを選択してください。</h2>
      <select 
        value={personality} 
        onChange={(e) => setPersonality(e.target.value)} 
      >
        <option value="">選択してください</option>
        <option value="学術的">学術的</option>
        <option value="批評的">批評的</option>
        <option value="フォーマル">フォーマル</option>
        <option value="カジュアル">カジュアル</option>
        <option value="ユーモラス">ユーモラス</option>
      </select>
      <h2></h2>

      <hr />
      <button onClick={handleSubmit2}>ブログ記事生成</button>

      {/* 生成されたマークダウンをHTMLとしてレンダリング */}
      <ReactMarkdown
        components={{
          h1: ({node, ...props}) => <h1 style={{color: 'red'}} {...props} />,
          h2: ({node, ...props}) => <h2 style={{color: 'blue'}} {...props} />
        }}
      >
        {`${postResponse}`}
      </ReactMarkdown>

      {generatedImageUrl && (
        <div>
          <h2>アイキャッチ画像</h2>
          <img src={generatedImageUrl} alt="Generated Image" />
        </div>
      )}

      <hr />
{/*       <button onClick={handleGetRequest}>GETリクエストを送信</button>
      {getResponse && <p>サーバーからのGET応答: {getResponse}</p>}
 */}
    </div>
  );
}
