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
    if (value <= maxValue) {
      // useState setter는 비동기처리 된다.
      //callback실행시 value가 반영이 안되어 있으므로, 새 value를 포한된 객체를 매개인자로 전달.
      setValue(Number(value));
      const newScore = { id, value: Number(value) };
      callback(parent, newScore);
    }
  };
  return { id, value, onInput };
};

export default useScoreInput;
