import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductBySlug } from '../../actions';
import Layout from '../../components/Layout';
import { generatePubliUrl } from '../../urlConfig';
import './style.css'
import { Link } from 'react-router-dom';
import Card from '../../components/UI/Card';



function ProductListPage(props) {
    const product = useSelector(state => state.product);
    // console.log("products in index:",product);
    const [priceRange, setPriceRange] = useState({
        under5k: 5000,
        under10k: 10000,
        under20k: 20000,
        under30k: 30000,
        under40k: 40000
    })
    const dispatch = useDispatch()
    useEffect(() => {
        const { match } = props;
        dispatch(getProductBySlug(match.params.slug))
    }, [])




    return (
        <div>
            <Layout>
                {
                    Object.keys(product.productsByPrice).map((key, index) => {
                        return (
                            <Card
                                headerLeft={`${props.match.params.slug} mobile under ${priceRange[key]}`}
                                headerRight={<button>View all</button>}
                                style={{
                                    width: 'calc{100% - 40px}',
                                    margin: '20px'
                                }}>

                                <div style={{ display: 'flex' }}>
                                    {
                                        product.productsByPrice[key].map(product =>
                                            <Link
                                                to={`/${product.slug}/${product._id}`}
                                                style={{ display: 'block' }} className='productContainer'>
                                                <div className='productImgContainer'>
                                                    <img src={generatePubliUrl(product.productPictures[0].img)} alt="" />
                                                </div>
                                                <div className='productInfo'>
                                                    <div style={{ margin: '5px 0' }}>{product.name}</div>
                                                    <div>
                                                        <span>4.3</span>&nbsp;
                                                        <span>33.45</span>
                                                    </div>
                                                    <div className='productPrice'>${product.price}</div>
                                                </div>
                                            </Link>
                                        )
                                    }
                                </div>
                            </Card>
                        )
                    })
                }
            </Layout>
        </div>
    )
}

export default ProductListPage;
