import { useEffect, useState } from "react";
import { getFoods } from "../api";
import FoodList from "./FoodList";

function App() {
  const [order, setOrder] = useState("createdAt");
  const [items, setItems] = useState([]);
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

 //getFoods() 함수는 아규먼트로 order 값에 해당하는 값을 받으니까, 
 //handleLoad() 함수를 조금 수정해서 orderQuery라는 파라미터를 받고 이걸 getFoods() 함수에 넘겨 준다.
  const handleLoad = async (orderQuery) => {
    const { foods } = await getFoods(orderQuery);
    setItems(foods);
  };
  //참고로 여기서 orderQuery라고 이름 붙인 건 order 스테이트와 이름이 겹치지 않도록 하기 위해서임.

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  useEffect(() => {
    handleLoad(order);
  }, [order]); 
  //useEffect() 함수의 두 번째 아규먼트로 [order]를 사용하면 order 스테이트 값이 바뀔 때마다 콜백 함수를 실행할 수 있다.

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
}

export default App;
