import "./styles.css";
import { useState } from "react";
import useInput from "./useInput";
import useScoreInput from "./useScoreInput";

export default function App() {
  //10글자미만인지 유효성 검사
  const name = useInput("Mr.", (value) => value.length <= 10);
  // const score = useScoreInput({
  //   maxValue: 100
  // });

  const [total, setTotal] = useState(0);
  /**
   * 사용자 입력값이 아직 useState반영전이므로,
   * 매개인자 score객체의 newValue를 total계산에 반영한다.
   *
   * @param {Array.fo(useScoreInput)} scores
   * @param {useScoreInput} score
   */
  const calcTotal = (scores, score) => {
    // console.log(scores); // [{"id":"practice00","value":1},{"id":"practice01","value":0}]
    // console.log("score@calTotal = ", score); // {id: "practice00", value: 3}
    const computed = scores.reduce((accumulator, current) => {
      // console.log("current@calTotal", current); // {id: "practice00", value: 12, onInput: ƒ} {id: "practice01", value: 0, onInput: ƒ}
      const { id, value } = current;
      if (id === score.id) {
        //현재 입력중인 input태그인 경우, 인자의 새 입력값을 더해준다.
        return accumulator + score.value;
      }
      return accumulator + value;
    }, 0);
    setTotal(computed); // async처리되므로, 아래 total은 변경전 값이다.
    // console.log(`computed = ${computed}`);
    // console.log(`total = ${total}`);
  };

  let scores = [];
  scores.push(
    useScoreInput({
      id: "practice00",
      maxValue: 40,
      callback: calcTotal,
      parent: scores //부모배열 참조
    })
  );
  scores.push(
    useScoreInput({
      id: "practice01",
      maxValue: 60,
      callback: calcTotal,
      parent: scores //부모배열 참조
    })
  );

  return (
    <div className="App">
      <h1>Hello useInput</h1>
      {/* <input
        placeholder="Name"
        value={name.value}
        onChange={name.onChange}
      /> */}
      <div>
        <input placeholder="Name" {...name} />
      </div>
      <h1>Hello useScoreInput</h1>
      <p>점수 input태그별 maxValue 유효성 검사 및 총점을 실시간 계산함.</p>
      <div>
        {/* <input placeholder="점수" {...score} /> */}
        {scores.map((score, index) => (
          <div key={index}>
            <input placeholder="점수" {...score} />
          </div>
        ))}
        <div>총점 : {total}</div>
      </div>
    </div>
  );
}
