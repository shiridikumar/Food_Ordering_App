import axios, { Axios } from "axios";
import { useEffect, useState } from "react";

const ModalBox = () => {

    const row = [];
    const [shop_filter, setshop] = useState();
    const tags_row = []
    const [tag_filter, settag] = useState();


    useEffect(() => {
        const loadPost = async () => {

            await axios.get("http://localhost:4000/user/all_vendors").then(response => {
                for (var i = 0; i < response.data.length; i++) {
                    var ids = i + '_' + response.data[i] + '_filter';
                    row.push(
                        <li className="list-group-item shops_li">
                            <input className="form-check-input me-1 shops_filter" type="checkbox" id={ids} value={response.data[i]} aria-label="..." />
                            {response.data[i]}
                        </li>)
                }
                console.log(row);
                setshop(row);
            })
            const tags = ['pizzas', 'burgers', 'drinks', 'icecream', 'samosas', 'maggi', 'sandwich', 'others'];
            for (var i = 0; i < tags.length; i++) {
                var ids = tags[i] + '_filter'
                tags_row.push(<li className="list-group-item tags_li">
                    <input className="form-check-input me-1 tags_filter" type="checkbox" id={ids} value={tags[i]} aria-label="..." />
                    {tags[i]}
                </li>
                )
            }
            settag(tags_row);
        }
        loadPost();

    }, [])

    const filtersearch= async()=>{
        const filtered_shops=[]
        var shop_ele=document.getElementsByClassName('shops_filter');
        console.log(shop_ele);

        for(var i=0;i<shop_ele.length;i++){
            if(shop_ele[i].checked && shop_ele[i].value!=''){
                filtered_shops.push(shop_ele[i].value);
            }
        }
        console.log(filtered_shops);
        const filtered_tags=[]
        var tags_ele=document.getElementsByClassName('tags_filter');
        console.log(tags_ele);
        for(var i=0;i<tags_ele.length;i++){
            if(tags_ele[i].checked && tags_ele[i].value!=''){
                filtered_tags.push(tags_ele[i].value);
            }
        }
        console.log(filtered_tags);
        var base_price=parseInt(document.getElementById('base_price').value);

        var ma_price=parseInt(document.getElementById('max_price').value);
        if(!ma_price){
            ma_price=Infinity
        }
        if(!base_price){
            base_price=0;
        }
        console.log(base_price);
        console.log(ma_price);
        var sp=0;
        var sr=0;

        var price_sort1=document.getElementById('price-sort1');
        if(price_sort1.checked){
            sp=1;
        }

        var price_sort2=document.getElementById('price-sort2');
        if(price_sort2.checked){
            sp=-1;
        }
        var price_sort3=document.getElementById('price-sort3');
        if(price_sort3.checked){
            sp=0;
        }

        var rating_sort1=document.getElementById('rating-sort1');
        if(rating_sort1.checked){
            sr=1;
        }

        var rating_sort2=document.getElementById('rating-sort2');
        if(rating_sort2.checked){
            sr=-1;
        }
        var rating_sort3=document.getElementById('rating-sort3');
        if(rating_sort3.checked){
            sr=0;
        }
        const vegs_arr=[]

        const vegel=document.getElementById('Veg-box');
        if(vegel.checked){
            vegs_arr.push(vegel.value);
        }

        const nvegel=document.getElementById('Non-veg-box');
        if(nvegel.checked){
            vegs_arr.push(nvegel.value);
        }

        
        const filter_details={
            vendors:filtered_shops,
            tags:filtered_tags,
            min_price:base_price,
            max_price:ma_price,
            price_sort:sp,
            rating_sort:sr,
            vegs:vegs_arr
        }

        await axios.post("http://localhost:4000/user/filter",filter_details).then(response=>{
            console.log(response);
        })
        




    }



    return (
        <div className="modal_box">
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Apply Filters</button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group vgn">
                                <h6>Filter by Veg and non veg</h6>
                                <li className="list-group-item">
                                    <input className="form-check-input me-1 Veg" type="checkbox" id='Veg-box' value="veg" aria-label="..." />
                                    Veg
                                </li>
                                <li className="list-group-item">
                                    <input className="form-check-input me-1 Non-Veg" type="checkbox" id='Non-veg-box' value="non-veg" aria-label="..." />
                                    Non-Veg
                                </li>
                            </ul>
                            <div className="shop-names">
                                <h6>Filter by Vendors</h6>
                                <div className="dropdown">
                                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        Select vendors
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <li className="list-group-item shops_li">
                                            <input className="form-check-input me-1 shops_filter" type="checkbox" id='all_shops' value="" aria-label="..." onChange={() => {
                                                var ele = document.getElementById('all_shops');
                                                var shop_li = document.getElementsByClassName("shops_filter");
                                                if (ele.checked) {
                                                    for (var i = 0; i < shop_li.length; i++) {
                                                        shop_li[i].checked = true;
                                                    }
                                                }
                                                else {
                                                    for (var i = 0; i < shop_li.length; i++) {
                                                        shop_li[i].checked = false;
                                                    }
                                                }
                                            }} />
                                            Select All
                                        </li>
                                        {shop_filter}
                                    </ul>
                                </div>
                            </div>

                            <div className="tags">
                                <h6>Filter by Adding tags</h6>
                                <div className="dropdown">
                                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        Add Tags
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <li className="list-group-item tags_li">
                                            <input className="form-check-input me-1 tags_filter" type="checkbox" id='all_tags' value="" aria-label="..." onChange={()=>{
                                                var ele=document.getElementById("all_tags");
                                                var all_ele=document.getElementsByClassName("tags_filter");
                                                if(ele.checked){
                                                    for(var i=0;i<all_ele.length;i++){
                                                        all_ele[i].checked=true;
                                                    }
                                                }
                                                else{
                                                    for(var i=0;i<all_ele.length;i++){
                                                        all_ele[i].checked=false;
                                                    }
                                                }
                                            }}/>
                                            Select all
                                        </li>
                                        {tag_filter}
                                    </ul>
                                </div>
                            </div>

                            <div className="price-filter">
                                <h6>Filter by price</h6>
                                <div className="input-filter">
                                    <h6>From</h6>
                                    <input type='number' id='base_price' />
                                    <h6>To</h6>
                                    <input type='number' id='max_price'/>
                                </div>
                            </div>
                            <div className="sort-price">
                                <h6>Sort by Price</h6>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="price" id="price-sort1" value="option1" />
                                    <label className="form-check-label" for="inlineRadio1">Ascending</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="price" id="price-sort2" value="option2" />
                                    <label className="form-check-label" for="inlineRadio2">Descending</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="price" id="price-sort3" value="option3" />
                                    <label className="form-check-label" for="inlineRadio3">None</label>
                                </div>
                                <br />
                                <br />

                                <h6>Sort by Rating</h6>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="rating" id="rating-sort1" value="option4" />
                                    <label className="form-check-label" for="inlineRadio4">Ascending</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="rating" id="rating-sort2" value="option5" />
                                    <label className="form-check-label" for="inlineRadio5">Descending</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="rating" id="rating-sort3" value="option6" />
                                    <label className="form-check-label" for="inlineRadio6">None</label>
                                </div>
                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={()=>{filtersearch()}}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalBox;