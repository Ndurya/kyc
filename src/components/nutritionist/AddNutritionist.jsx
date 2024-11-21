import React, { useState } from "react"
import { addNutritionist } from "../utils/ApiFunctions"

const AddNutritionist = () =>{
    const[newNutritionist, setNewNutritionist] = useState({        
        photo : null,
        nutritionistType : "",
        nutritionistPrice : ""      
    })
    
    const[imagePreview, setImagePreview] = useState("")
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")

    const handleNutritionistInputChange = (e) =>{
        const name = e.target.name 
        let value = e.target.value
        if (name === "nutritionistPrice"){
            if(!isNaN(value)){
                value.perseInt(value)
            }else{
                value = ""
            }
        }
        setNewNutritionist({...newNutritionist, [name]: value})
    }

    const handleImageChange= (e) =>{
        const selectedImage = e.target.files[0]
        setNewNutritionist({...newNutritionist, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }
    
    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const success = await addNutritionist(newNutritionist.photo, newNutritionist.nutritionistType, newNutritionist.nutritionistPrice)
            if(success !==undefined){
                setSuccessMessage("A new nutrutionist was added to the database")
                setNewNutritionist({photo: null, nutritionitType : "", nutritionistPrice : ""})
                setImagePreview("")
                setErrorMessage("")
            }else{
                setErrorMessage("Error adding nutritionist")
            }
        }catch(error){
            setErrorMessage(error.Message)
        }
    }

    return (
        <>
            <section className="container, mt-5 mb-5">
                <div className="row justify-content-center"> 
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Add a New Nutritionist</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nutritionistType" className="form-lebal">
                                Nutritionist Type
                                </label>
                                <div>
                                    <NutritionistTypeSelector 
                                    handleNutritionistInputChange={handleNutritionistInputChange}
                                    newNutritionist={newNutritionist}
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="nutritionistPrice" className="form-lebal">
                                Nutritionist Price
                                </label>
                                <input
                                className="form-control"
                                required
                                id="nutritionistPrice"
                                type="number"
                                name="nutritionistPrice"
                                value={newNutritionist.nutritionistPrice}
                                onChange={handleNutritionistInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <lebel htmlFor="photo" className="form-lebal">
                                Nutritionist photo
                                </lebel>
                                <input
                                id ="photo"
                                name = "photo"
                                type = "file"
                                className="form-control"
                                onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img src={imagePreview}
                                    alt="Preview Nutritionist Photo"
                                    style={{maxWidth: "400px", maxHeight: "400px"}}
                                    className="mb-3"/>
                                )}
                            </div>

                            <div className="d-grid d-md-flex mt-2">
                                <button className="btn btn-outline-primary ml-5">
                                    Save Nutritionist
                                </button>  
                            </div>
                        </form>
                    </div>
                </div>
            </section>  
        </>
    )
}

export default AddNutritionist