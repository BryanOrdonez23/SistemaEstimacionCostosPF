import { createContext, useState, useContext, useEffect} from "react";
import { registerRequest, loginRequest, verifyTokenRequest,deleteUserRequest, 
  getUserByIdRequest, updateUserRequest, getUserByNameRequest, getUsersRequest
, getProyectsRequest, getProyectRequest, deleteProyectRequest, updateProyectRequest, getAllProyectsRequest
, createTipoFuncionRequest, getTipoFuncionesRequest,getTipoFuncionRequest, deleteTipoFuncionRequest, updateTipoFuncionRequest
} from "../api/admin";
import Cookies from "js-cookie";
export const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin debe estar dentro del proveedor AdminContext");
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tipoFunciones, setTipoFunciones] = useState([]);
  const [tipoFuncion, setTipoFuncion] = useState([]);


  const [proyects, setProyects] = useState([]);
  const [allproyects, setAllProyects] = useState([]);
  const [proyect, setProyect] = useState([]);

  const getProyects = async () => {
    try {
      const res = await getProyectsRequest();
      setProyects(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProyect = async (id) => {
    try {
      const res = await getProyectRequest(id);
      setProyect(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProyect = async (id, proyect) => {
    try {
      const res = await updateProyectRequest(id, proyect);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProyect = async (id) => {
    try {
      const res = await deleteProyectRequest(id);
      await getAllProyects();
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const singup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
    console.log(error.response);
      setErrors(error.response.data);
      
  }};

  const singin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res.data);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
    if(Array.isArray(error.response.data)){
      return setErrors(error.response.data);
    }
    setErrors([error.response.data.message]); 
    }
  };

  const logout = () => {
    Cookies.remove("tokenadmin");
    setUser(null);
    setIsAuthenticated(false);
  }


const getUserByName = async (name) => {
    try {
        const res = await getUserByNameRequest(name);
        setUsers(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const getUsers = async () => {
    try {
        const res = await getUsersRequest();
        setUsers(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (id) => {
    try {
        const res = await deleteUserRequest(id);
        await getUsers();
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (id, user) => {
    try {
        const res = await updateUserRequest(id, user);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const getUser = async (id) => {
    try {
        const res = await getUserByIdRequest(id);
        setUser(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

////

const getAllProyects = async () => {
  try {
    const res = await getAllProyectsRequest();
    setAllProyects(res.data);
    //console.log(res.data);
  } catch (error) {
    console.error(error);
  }
}

//

const createTipoFuncion = async (tipoFuncion) => {
  try {
    const res = await createTipoFuncionRequest(tipoFuncion);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

const getTipoFuncion = async (id) => {
  try {
    const res = await getTipoFuncionRequest(id);
    setTipoFuncion(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

const getTipoFunciones = async () => {
  try {
    const res = await getTipoFuncionesRequest();
    setTipoFunciones(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

const deleteTipoFuncion = async (id) => {
  try {
    const res = await deleteTipoFuncionRequest(id);
    await getTipoFunciones();
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

const updateTipoFuncion = async (id, tipoFuncion) => {
  try {
    const res = await updateTipoFuncionRequest(id, tipoFuncion);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

////
  useEffect(() => {
    if (errors.length > 0) {
     const timer= setTimeout(() => {
        setErrors([]);
      }, 5000)
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.tokenadmin){
        console.log("no hay token");
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(cookies.tokenadmin);
        
        if(!res.data){
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
    
  }, [])

  return (
    <AdminContext.Provider
      value={{
        user,
        singup,
        loading,
        isAuthenticated,
        errors,
        singin,
        logout,
        setUser,
        getUserByName,
        getUsers,
        deleteUser,
        updateUser,
        users,
        getUser,
        getProyects,
        getProyect,
        deleteProyect,
        updateProyect,
        proyects,
        proyect,
        getAllProyects,
        allproyects,
        createTipoFuncion,
        getTipoFuncion,
        deleteTipoFuncion,
        updateTipoFuncion,
        getTipoFunciones,
        tipoFunciones,
        tipoFuncion
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
