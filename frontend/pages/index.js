import { useState } from 'react';
import ReactMarkdown from 'react-markdown'

export default function Home() {

  //POSTリクエストを送信
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
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
      body: JSON.stringify({
        "age":age,
        "gender":gender,
        "theme":theme,
        "words":words,
        "objective":objective,
        "personality":personality
      }),
    });
    console.log(JSON.stringify({ "age":age, "gender":gender, "theme":theme, "words":words, "objective":objective, "personality":personality }));
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
      <h1>LasTomo（Vision Reflection）</h1>

      <h2>年齢は？</h2>
      <input 
        type="number" 
        value={age} 
        onChange={(e) => setAge(e.target.value)} 
        placeholder="数字を入力して下さい" 
      />

      <h2>性別は？（男性/女性/その他自由記述）</h2>
      <input 
        type="text" 
        value={gender} 
        onChange={(e) => setGender(e.target.value)} 
        placeholder="テキストを入力して下さい" 
      />


      <h2>職業は？</h2>
      <input 
        type="text" 
        value={theme} 
        onChange={(e) => setTheme(e.target.value)} 
        placeholder="テキストを入力して下さい" 
      />

      <h2>休日は何をしていますか？</h2>
      <select 
        value={objective} 
        onChange={(e) => setObjective(e.target.value)} 
      >
        <option value="">選択してください</option>
        <option value="何もしない">何もしない</option>
        <option value="昼寝">昼寝</option>
        <option value="スポーツ">スポーツ</option>
        <option value="読書">読書</option>
        <option value="音楽">音楽</option>
      </select>

      <h2>家族構成は？</h2>
      <select 
        value={personality} 
        onChange={(e) => setPersonality(e.target.value)} 
      >
        <option value="">選択してください</option>
        <option value="独身">独身</option>
        <option value="既婚">既婚</option>
        <option value="子供1人">子供１人</option>
        <option value="子供２人">子供２人</option>
        <option value="子供3人">子供3人</option>
      </select>
      <h2></h2>

      <hr />
      <button onClick={handleSubmit2}>終活リフレクション</button>

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
