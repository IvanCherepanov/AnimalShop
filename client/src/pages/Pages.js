import React, {useContext} from 'react';
import {Pagination} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const Pages = observer(() => {
    const {product} = useContext(Context)
    const pageCount = Math.ceil(product.totalCount / product.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++){
        pages.push(i)
    }

    return (
        <Pagination className='mt-5'>
            {pages.map(page =>
                <Pagination.Item
                    key = {page}
                    active={product.page === page}
                    onClick = {()=>product.setPage(page)}
                >
                    {page+1}
                </Pagination.Item>
            )}

        </Pagination>
    );
});

export default Pages;