import './App.scss';
import { AddBtn } from './components/AddBtn/AddBtn';
import { AllTasks } from './components/AllTasks/AllTasks';

function App() {
  return (
    <div className='body'>
      <AddBtn />
      <AllTasks />
    </div>
  );
}

export default App;
