import { useState, useEffect, useRef } from "react";
import '../styles/homeStyles.css';
import { Link, useNavigate } from "react-router-dom";


export default function Home(props) {

    const [fileContent, setFileContent] = useState();

    const [fields,setFields] = useState(["subcategory","title","price","popularity"]);

    const [selectedFields,setSelectedFields] = useState([]);

    const [clickedFields, setClickedFields] = useState([]);

    const navigate = useNavigate();

    const handleFileUpload = (e) => {
        e.preventDefault();

        const file = document.getElementById('input-file').files[0];

        const fileReader = new FileReader();

        fileReader.onload = () => {
            if(file.name.endsWith(".json")) {
                setFileContent(JSON.parse(fileReader.result));
            }
            else{
                setFileContent(fileReader.result);
            }
        };

        fileReader.readAsText(file);
    }

    const handleFieldSelect = (e,fld,key,field_class) => {
        e.preventDefault();
        const field = document.querySelectorAll(field_class)[key];
        if(!field.style.backgroundColor) {
            field.style.color = 'white';
            field.style.backgroundColor = 'blue';
            setClickedFields((prevClickedFields) => [...prevClickedFields,fld]);
        }
        else{
            field.style.color = 'black';
            field.style.backgroundColor = "";
            setClickedFields(clickedFields.filter(f => f != fld));
        }
    }

    useEffect(() => {
        const field = document.querySelectorAll(".field");
        const selected_field = document.querySelectorAll(".selected_field");
        for(let i=0;i<field.length;i++) {
            field[i].style.color = 'black';
            field[i].style.backgroundColor = "";
        }
        for(let i=0;i<selected_field.length;i++) {
            selected_field[i].style.color = 'black';
            selected_field[i].style.backgroundColor = "";
        }
    },[fields])

    const addField = (e) => {
        clickedFields.forEach(addToSelected);
        setFields(fields.filter(field => clickedFields.includes(field)==false));
        setClickedFields([]);
    }

    const addToSelected = (category) => {
        setSelectedFields((prevSelectedFields) => [...prevSelectedFields,category]);
    }

    const addtoOriginalFields = (category) => {
        setFields((prevFields) => [...prevFields,category]);
    }

    const removeField = (e) => {
        clickedFields.forEach(addtoOriginalFields);
        setSelectedFields(selectedFields.filter(field => clickedFields.includes(field)==false));
        setClickedFields([]);
    }

    const handleNavigate = (e) => {
        e.preventDefault();
        navigate("/display",{ state: { displayFields: selectedFields, content: fileContent } });
    }

    return (
        <div className="container">
            <div className="step1and2">
                <div className="step1">
                    <p>Step 1: </p>
                    <p>Select File:</p>
                    <input id="input-file" type="file" accept=".csv, .json" onChange={(e) => handleFileUpload(e)}/>
                    <p>Supported File Types: .CSV, .JSON</p>
                </div>
                <div className="step2">
                    <p>Step 2: </p>
                    <div className="select-fields">
                        <div className="select">
                            File Type:&emsp;
                            <span>
                                <select>
                                    <option>CSV</option>
                                    <option>JSON</option>
                                </select>
                            </span>
                        </div>

                        <div className="select">
                            Character Encoding:&emsp;
                            <span>
                                <select>
                                    <option>UTF-8</option>
                                    <option>UTF-16</option>
                                    <option>UTF-32</option>
                                </select>
                            </span>
                        </div>

                        <div className="select">
                            Delimiter:&emsp;
                            <span>
                                <select>
                                    <option>comma</option>
                                    <option>curly bracket (JSON)</option>
                                </select>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="step3">
                <p>Step 3: <span>Display Handling</span></p>
                <p style={{marginBottom: "2%"}}>Select fields to be displayed</p>
                <div className="fields">
                    <div className="panel">
                        {fields.length==0 ? <div>All Selected</div> : 
                            fields.map((field,key) => (
                                <div className="field"  onClick={(e) => handleFieldSelect(e,field,key,".field")}>{field}</div>
                            ))
                        }
                    </div>
                    <div>
                        <div>
                            <button onClick={(e) => addField(e)}>&gt;&gt;</button>
                        </div><br></br>
                        <div>
                            <button onClick={(e) => removeField(e)}>&lt;&lt;</button>
                        </div>
                    </div>
                    <div className="panel">
                        {selectedFields.length==0 ? <div>None Selected</div> : 
                            selectedFields.map((selectedField,key) => (
                                <div className="selected_field"  onClick={(e) => handleFieldSelect(e,selectedField,key,".selected_field")}>{selectedField}</div>
                            ))
                        }
                    </div>
                </div>
                <button className="display-button" onClick={(e) => handleNavigate(e)}>Display Data</button>
            </div>
        </div>
    )
}