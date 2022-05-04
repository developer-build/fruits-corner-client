import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import { TrashIcon } from '@heroicons/react/solid'
import './Manageitems.css'
import { useNavigate } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import auth from '../../firebase.init';

const ManageItems = () => {
    const [fruits, setFruits] = useState([]);
    // const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://infinite-lowlands-70374.herokuapp.com/allfruits')
            .then(res => res.json())
            .then(data => setFruits(data));
    }, []);

    const handleDelete=id=>{
        const response = window.confirm('Are you sure?');
        
        if(response===true){
            fetch('https://infinite-lowlands-70374.herokuapp.com/allfruits/'+id, {
                method:'DELETE'
            })
            .then(res => res.json())
            .then(data => console.log(data));
            const rest = fruits.filter(fruit=>fruit._id!==id);
            setFruits(rest);
        }
    }

    return (
        <section className='p-5'>
            <h2 className='text-center pb-3'>Manage Inventories</h2>
            <div>
                <Table striped bordered hover className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Supplier</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            fruits.map(fruit =>
                                <tr key={fruit._id} className='fruit-row'>
                                    <td>{fruit.name}</td>
                                    <td>{fruit.price}</td>
                                    <td>{fruit.quantity}</td>
                                    <td>{fruit.supplier}</td>
                                    <td><button onClick={()=>handleDelete(fruit._id)} className='delete-btn'><TrashIcon style={{width:'17px'}}/></button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
                <button onClick={() => navigate('/addfruit')} className='manage-btn me-0'>Add new item</button>
        </section>
    );
};

export default ManageItems;