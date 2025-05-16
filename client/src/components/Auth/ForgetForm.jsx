import { Margin } from "@mui/icons-material";
import { useForm } from "../../hooks/useAuth";
import { forgetUser } from "../../services/authService";
import { keyWord } from "../../utils/keyword";

function ForgetForm() {
    const { values, handleChange, handleSubmit } = useForm(
        {
            storeName: "",
            email: "",
            password: "",
        },
        forgetUser,
        keyWord?.actionType?.forget
    );
    return (
        <div className="text-align: center" style={{marginLeft: '20vh', width: '100vh'}}>
            <form>
                <h2 className="text-center mb-4">
                    <i className="fas fa-clinic-medical me-2"></i>FORGOT ACCOUNT DETAILS
                </h2>
                <div>
                    <label htmlFor="name" className="form-label"> Store Id/Email Id : </label>
                    <input
                        id="name"
                        type="text"
                        name="storeName"
                        className="form-control"style={{width: '70vh' , marginLeft: '30vh' , marginTop: '-35px', border: ''}}
                        // value={}
                        // onChange={handleChange}
                        // required
                        placeholder='Enter store id / Email id'
                        />

                </div>
                <button type="submit" className="btn btn-primary btn-sm">
                    Back
                </button>
                <button type="submit" className="btn btn-success btn-sm">
                    Next
                </button>
            </form>
        </div>
    )
}

export default ForgetForm;