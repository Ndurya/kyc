import React, { useEffect, useState } from 'react';
import { getNutritionistTypes } from '../utils/ApiFunctions';

const NutritionistTypeSelector = ({ handleNutritionistInputChange, newNutritionist }) => {
    const[nutritionistTypes, setNutritionistTypes] = useState([""])
    const[showNewNutritionistTypeInput, setShowNewNutrionistTypeInput] = useState(false)
    const[newNutritionistType, setNewNutritionistType] = useState("")

    useEffect(() => {
        getNutritionistTypes().then((data) =>{ 
            setNutritionistTypes(data)
        })

        return () => {
            second
        }
    }, [])

    const handleNewNutritionistTypeInputChange = (e)=>{
        setNewNutritionistType(e.target.value);
    }

    const handleAddNewNutritionistType = () =>{
        if(newNutritionistType !== ""){
            setNutritionistTypes([...nutritionistTypes, newNutritionistType])
            setNewNutritionistType("")
            setShowNewNutrionistTypeInput(false)
            
        }
    }

  return (
    <>

        {nutritionistTypes.length> 0 && (
            <div>
                <select
                id="nutritionistType"
                name="nutritionistType"
                value={newNutritionist.nutritionistType}
                onChange={(e) =>{
                    if(e.target.value === "Add New"){
                        setShowNewNutrionistTypeInput(true)
                    }else{
                        handleNutritionistInputChange(e)
                    }
                }}>
                    <option value={""}> Select a nutritionist type</option>
                    <option value={"Add new"}> Add new</option>
                    {nutritionistTypes.map((type, index) =>(
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                {showNewNutritionistTypeInput && (
                    <div className="input-group">
                        <input                     
                        className="form-control"
                        type="text"
                        placeholder="Enter a new nutritionist type"
                        onChange={handleNewNutritionistTypeInputChange}
                        />
                        <button className="btn btn-clinic" type="button" onClick={handleAddNewNutritionistType}>
                            Add
                        </button>
                    </div>
                )}
            </div>
        )}
      
    </>
  )
}

export default NutritionistTypeSelector
