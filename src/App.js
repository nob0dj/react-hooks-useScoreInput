import "./styles.css";
import useScoreInput, { useTotal, scoresValidator } from "./useScoreInput";

export default function App() {
  const { total, calcTotal } = useTotal(0);

  let scores = [];
  scores.push(
    useScoreInput({
      id: "practice00",
      maxValue: 30,
      callback: calcTotal,
      parent: scores //부모배열 참조
    })
  );
  scores.push(
    useScoreInput({
      id: "practice01",
      maxValue: 30,
      callback: calcTotal,
      parent: scores //부모배열 참조
    })
  );
  scores.push(
    useScoreInput({
      id: "practice02",
      maxValue: 40,
      callback: calcTotal,
      parent: scores //부모배열 참조
    })
  );

  const { isOk, maxValues, sum } = scoresValidator(scores);
  // console.log(isOk, maxValues, sum);
  if (!isOk) {
    throw new Error(`총점이 100점이 아닙니다. 총점(${sum}) - ${maxValues}`);
  }

  return (
    <div className="App">
      <h1>Hello useScoreInput</h1>
      <p>점수 input태그별 maxValue 유효성 검사 및 총점을 실시간 계산함.</p>
      <div>
        {scores.map((score, index) => {
          //score에서 maxValue속성 제외
          const { maxValue, ..._score } = score;
          return (
            <div key={index}>
              <input placeholder="점수" {..._score} /> / {maxValue}
            </div>
          );
        })}
        <div>총점 : {total}</div>
      </div>
    </div>
  );
}
