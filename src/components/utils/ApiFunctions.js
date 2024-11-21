import axios from "axios"

export const api = axios.create({
    baseURL :"http://localhost:9192" 
})
/* This function adds a new nutritionist nutritionist to the database  */
export async function addNutritionist(photo, nutritionistType, nutritionistPrice){
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("nutritionistType", nutritionistType)
    formData.append("nutritionistPrice", nutritionistPrice)

    const response = await api.post("/nutritionists/add/new-nutritionist", formData)
    if(response.status === 201){
        return true        
    }else{
        return false
    }
}

/* This function gets all nutritionists types from the database */
export async function getNutritionistTypes() {
    try{
        const response = await api.get("/nutritionists/nutritionist/nutritionist-types")
        return response.data
    }catch(error){
        throw new Error("Error fetching nutritionist types")
    }    
}

export default App