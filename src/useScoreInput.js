import { useState } from "react";

/**
 * 각 input태그별 maxValue안에서만 작성가능
 * blur이벤트시 전체 useInputScore 합계를 구한다.
 * 전체 useInputScore의 합계는 100점이다.
 */
const useScoreInput = (score) => {
  const { id, maxValue, callback, parent } = score;
  const [value, setValue] = useState(0);

  const onInput = (e) => {
    const {
      target: { value }
    } = e;
    console.log(value);
    //소수점 있는 경우
    if (value.slice(value.length - 1) === ".") {
      setValue(value);
      return;
    }
    if (value <= maxValue) {
      // useState setter는 비동기처리 된다.
      //callback실행시 value가 반영이 안되어 있으므로, 새 value를 포한된 객체를 매개인자로 전달.
      setValue(Number(value));
      const newScore = { id, value: Number(value) };
      callback(parent, newScore);
    }
  };
  return { id, value, maxValue, onInput };
};

export const useTotal = () => {
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

  return { total, calcTotal };
};

export const scoresValidator = (scores) => {
  let isOk = true;
  let sum = 0;
  let maxValues = [];
  scores.forEach(({ maxValue }) => {
    sum += maxValue;
    maxValues.push(maxValue);
  });
  if (sum !== 100) isOk = false;
  return { isOk, maxValues, sum };
};

export default useScoreInput;
