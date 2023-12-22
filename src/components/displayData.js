import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/displayStyles.css";

export default function DisplayData(props) {
    const location = useLocation();
    const tableCols = location.state.displayFields;
    var fileContent = location.state.content;
    delete fileContent.count;
    const productData = Object.values(Object.values(fileContent)[0]);

    const compareByPopularity = (product1, product2) => {
        return product2["popularity"]-product1["popularity"];
    }

    productData.sort(compareByPopularity);

    return (
        <div className="table-container">
            <table className="product-table">
                <thead className="heading-container">
                    {
                        tableCols.map((col) => {
                            switch(col) {
                                case 'subcategory':
                                    return <td className="heading" style={{width:"20%",fontSize: "20px"}}>Sub-Category</td>
                                case 'title':
                                    return <td className="heading" style={{width: "50%",fontSize: "20px"}}>Title</td>
                                case 'price':
                                    return <td className="heading" style={{width: "15%",fontSize: "20px"}}>Price</td>
                                case 'popularity':
                                    return <td className="heading" style={{width: "15%",fontSize: "20px"}}>Popularity</td>
                            }
                        })
                    }
                </thead>
                <tbody className="table-rows">
                    {productData.map((product) => (
                        <tr className="product-container">
                            {tableCols.map((col) => {
                                switch(col) {
                                    case 'subcategory':
                                        return <td style={{width:"20%",borderRight: "1.5px solid black",borderLeft: "1.5px solid black"}}>{product['subcategory']}</td>
                                    case 'title':
                                        return <td style={{width: "50%",borderRight: "1.5px solid black"}}>{product['title']}</td>
                                    case 'price':
                                        return <td style={{width: "15%",borderRight: "1.5px solid black"}}>{product['price']}</td>
                                    case 'popularity':
                                        return <td style={{width: "15%",borderRight: "1.5px solid black"}}>{product['popularity']}</td>
                                }
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}