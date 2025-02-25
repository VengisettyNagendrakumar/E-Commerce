// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Loader from '../components/Loader';
// import Message from '../components/Message';
// import { Table, Button,Row,Col } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { LinkContainer } from 'react-router-bootstrap';
// import { listProducts,deleteProduct,ProductCreate } from '../actions/productActions';
// import { createProductReset } from '../store/create-product';

// function ProductListScreen() {
//     const dispatch = useDispatch();
//     const productList = useSelector(state => state.product);
//     const { loading, error, products } = productList;
//     const navigate = useNavigate();
    
//     const userInfo = useSelector(state => state.userLogin.userInfo);

//     const productDelete=useSelector(state => state.productDelete)
//     const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;


//     const createProduct = useSelector(state => state.createProduct);
//     const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = createProduct;
    
//     useEffect(() => {
//         dispatch(createProductReset());
//         if(!userInfo.isAdmin){
//             navigate('/login');

//         }

//         if(successCreate){
//             navigate(`/admin/product/${createProduct._id}/edit`)
//         }
//         else{
//             dispatch(listProducts())
//         }
        
//     }, [dispatch,navigate,userInfo,successDelete,successCreate,createdProduct]);
    
//     const deleteHandler = (id) => {
//         if(window.confirm('Are you sure you want to delete this product?')){
//         dispatch(deleteProduct(id));
//         dispatch(listProducts());
//         }
        
//     }
    
//     const createProductHandler = () => {
//         dispatch(ProductCreate());
//     }

//     return (
//         <div>
//             <Row className='align-items-center'>
//                 <Col>
//                 <h1>Product List</h1>
//                 </Col>
//                 <Col className='text-right'>
//                    <Button className='my-3' onClick={createProductHandler}>
//                     Create Product <i className='fas fa-plus'></i>
//                    </Button>
//                 </Col>
//             </Row>
//             {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
//             {successDelete && <Message variant='success'>Product deleted successfully</Message>}


//             {loadingCreate && <Loader />}
//             {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

//             {loading ? (
//                 <Loader />
//             ) : error ? (
//                 <Message variant="danger">{error}</Message>
//             ) : (
//                 <Table striped bordered hover responsive className='table-sm'>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Name</th>
//                             <th>Price</th>
//                             <th>Category</th>
//                             <th>Brand</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {products .map(product=> (
//                             <tr key={product._id}>
//                                 <td>{product._id}</td>
//                                 <td>{product.name}</td>
//                                 <td>${product.price}</td>
//                                 <td>{product.category}</td>
//                                 <td>{product.brand}</td>

//                                 <td>
//                                     <LinkContainer to={`/admin/product/${product._id}/edit`}>
//                                         <Button variant="light" className="btn-sm"><i className="fas fa-edit"></i></Button>
//                                     </LinkContainer>

//                                     <Button variant="light" className="btn-sm" onClick={()=>deleteHandler(product._id)}><i className="fas fa-trash"></i></Button>

//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             )}
//         </div>
//     );
// }

// export default ProductListScreen;


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { listProducts, deleteProduct, ProductCreate } from '../actions/productActions';
import { createProductReset } from '../store/create-product';

function ProductListScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productList = useSelector(state => state.product);
    const { loading, error, products } = productList;

    const userInfo = useSelector(state => state.userLogin.userInfo);

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const createProduct = useSelector(state => state.createProduct);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = createProduct;

    useEffect(() => {
        if (!userInfo.isAdmin) {
            navigate('/login');
        }

        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`);
            dispatch(createProductReset());
        } else {
            dispatch(listProducts());
        }
    }, [dispatch, navigate, userInfo, successCreate, createdProduct]);

    useEffect(() => {
        if (successDelete) {
            dispatch(listProducts());
        }
    }, [dispatch, successDelete]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id));
        }
    };

    const createProductHandler = () => {
        dispatch(ProductCreate());
    };

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Product List</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        Create Product <i className='fas fa-plus'></i>
                    </Button>
                </Col>
            </Row>
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {successDelete && <Message variant='success'>Product deleted successfully</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant="light" className="btn-sm"><i className="fas fa-edit"></i></Button>
                                    </LinkContainer>
                                    <Button variant="light" className="btn-sm" onClick={() => deleteHandler(product._id)}><i className="fas fa-trash"></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default ProductListScreen;
