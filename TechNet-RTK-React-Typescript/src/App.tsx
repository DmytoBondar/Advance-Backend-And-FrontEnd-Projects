import { decrement, increment } from "./redux/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks"

const App = () => {
  const state = useAppSelector((state) => state.counter)
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Counter : {state.value}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  )
}
export default App