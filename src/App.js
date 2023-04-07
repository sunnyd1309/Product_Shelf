import './App.css';
import { Button } from '@mui/material';
import ProductDetailComponent from './Components/ProductDetail';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_PATH } from './Utils/Constants';

function App() {
  const [productList, setProductList] = useState([]);
  const [hideProductButton, setHideAddButton] = useState(false);
  
  useEffect(() => {
    //api call to get data
   getAllProductDetails(); 
  },[]);

  useEffect(() => {
    if(productList && productList.length && productList[productList.length-1]["id"] === -1){
      setHideAddButton(true);
    }
    else setHideAddButton(false);
  }, [productList])

  const getAllProductDetails = async () => {

    const allProductList = await axios.get(API_PATH);
    // console.log(allProductList);
    if(allProductList && allProductList.data) setProductList(allProductList.data);
  }

  const addNewProduct = () => {
    setProductList([...productList, {id : -1}])
  }

  const saveHandler = (obj) => {
    axios.post(API_PATH, obj).then(res => {
      getAllProductDetails();
    })
  }

  const removeHandler = () => {
    const newList = [...productList];
    newList.pop();
    setProductList(newList);
  }

  const deleteHandler = (id) => {
    axios.delete(`${API_PATH}/${id}`).then(res => {
      getAllProductDetails();
    })
  }

  return (
    <div className="App">
      <div>
        <Button variant="contained" disabled={hideProductButton} onClick={addNewProduct}>Add New</Button>
      </div>
      <div className="TableContainer">
        <ProductDetailComponent 
          productList={productList}
          setProductList={setProductList}
          removeHandler={removeHandler}
          saveHandler={saveHandler}
          deleteHandler={deleteHandler}
        />
      </div>
    </div>
  );
}

export default App;
