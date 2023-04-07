import '../App.css';
import { Button } from '@mui/material';
import { useRef } from 'react';
import TextField from '@mui/material/TextField';

const ProductDetailComponent = ({productList, removeHandler, saveHandler, deleteHandler}) => {
  const productVal = useRef({});

  const save = () => {
    if(Object.keys(productVal.current).length !== 4) {alert("Please enter all the values to save"); return;}
    const objToSave = {
      "brandName": productVal.current.brandVal,
      "category": productVal.current.catVal,
      "name": productVal.current.nameVal,
      "price": productVal.current.priceVal,
      "quantity": 1
    };
    saveHandler(objToSave);
    productVal.current = {};
  }

  return (
    <div>
      <table>
        <tr>
          <th>Brand</th>
          <th>Category</th>
          <th>Name</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
        {productList && productList.length > 0 && productList.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.id !== -1 ? item.brandName : <TextField id="standard-basic" variant="standard" onChange={(e) => productVal.current.brandVal = e.currentTarget.value} />}</td>
              <td>{item.id !== -1 ? item.category : <TextField id="standard-basic" variant="standard" onChange={(e) => productVal.current.catVal = e.currentTarget.value} />}</td>
              <td>{item.id !== -1 ? item.name : <TextField id="standard-basic" variant="standard" onChange={(e) => productVal.current.nameVal = e.currentTarget.value} />}</td>
              <td>{item.id !== -1 ? item.price : <TextField id="standard-basic" variant="standard" onChange={(e) => productVal.current.priceVal = e.currentTarget.value} />}</td>
              <td>{item.id !== -1 ? <><Button onClick={() => deleteHandler(item.id)}>Delete</Button></> : <><Button onClick={removeHandler}>Remove</Button>/<Button onClick={save}>Save</Button></>}</td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}

export default ProductDetailComponent;
