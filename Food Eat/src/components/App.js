import { useState } from "react";
import FoodList from "./FoodList";
import mockItems from "../mock.json";

function App() {
  const [order, setOrder] = useState("createdAt");
  const [items, setItems] = useState(mockItems);
  //삭제 버튼을 클릭할 때마다 일어나는 일을 살펴봅시다.
  //우선 보여줄 배열을 해당 요소가 제외된 배열로 변경합니다.
  //그리고 리액트에서 재렌더링을 해서 변경된 데이터를 보여주어야 하죠.
  //이렇게 배열이 바뀔 때마다 재렌더링을 해야하니까 배열을 저장하는데 State를 사용해야 힙니다.
  //그래서 App 컴포넌트에서 기존에 사용하던 mock.json 데이터를 mockItems라고 바꾸고, items라는 스테이트의 초깃값으로 넣어 주었습니다.

  const handleNewestClick = () => setOrder("createdAt");

  const handleCalorieClick = () => setOrder("calorie");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    //배열에서 특정 항목을 삭제할 때는 filter()라는 배열 메소드를 사용할 수 있습니다.
    //배열 각 요소를 구분하는 고유한 값인 id 를 활용해서 필터링합니다.
    setItems(nextItems);
  };

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
}

export default App;
