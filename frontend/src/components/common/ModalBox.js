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
                            <input className="form-check-input me-1 shops_filter" type="checkbox" id={ids} value="" aria-label="..." />
                            {response.data[i]}
                        </li>)
                }
                console.log(row);
                setshop(row);
            })
            const tags = ['pizzas', 'burgers', 'drinks', 'icecream', 'samosas', 'maggi', 'sandwich', 'others'];
            tags_row.push(
                <li className="list-group-item tags_li">
                    <input className="form-check-input me-1 tags_filter" type="checkbox" id='all_tags' value="" aria-label="..." />
                    Select all
                </li>

            )
            for (var i = 0; i < tags.length; i++) {
                var ids = tags[i] + '_filter'
                tags_row.push(<li className="list-group-item tags_li">
                    <input className="form-check-input me-1 tags_filter" type="checkbox" id={ids} value="" aria-label="..." />
                    {tags[i]}
                </li>
                )
            }
            settag(tags_row);
        }
        loadPost();

    }, [])



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
                                    <input className="form-check-input me-1 Veg" type="checkbox" id='Veg-box' value="" aria-label="..." />
                                    Veg
                                </li>
                                <li className="list-group-item">
                                    <input className="form-check-input me-1 Non-Veg" type="checkbox" id='Non-veg-box' value="" aria-label="..." />
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
                                            <input className="form-check-input me-1 shops_filter" type="checkbox" id='all_shops' value="" aria-label="..." />
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
                                        {tag_filter}
                                    </ul>
                                </div>
                            </div>

                            <div className="price-filter">
                                <h6>Filter by price</h6>
                                <div className="input-filter">
                                    <h6>From</h6>
                                    <input type='number' />
                                    <h6>To</h6>
                                    <input type='number' />
                                </div>
                            </div>
                            <div className="sort-price">
                                <h6>Sort by Price</h6>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="price-sort1" value="option1" />
                                    <label className="form-check-label" for="inlineRadio1">Ascending</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="price-sort2" value="option2" />
                                    <label className="form-check-label" for="inlineRadio2">Descending</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="price-sort3" value="option3" />
                                    <label className="form-check-label" for="inlineRadio3">None</label>
                                </div>
                                <br/>
                                <br/>

                                <h6>Sort by Rating</h6>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="rating-sort1" value="option1" />
                                    <label className="form-check-label" for="inlineRadio1">Ascending</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="rating-sort2" value="option2" />
                                    <label className="form-check-label" for="inlineRadio2">Descending</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="rating-sort3" value="option3" />
                                    <label className="form-check-label" for="inlineRadio3">None</label>
                                </div>
                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalBox;