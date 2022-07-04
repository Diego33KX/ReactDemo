import React,{ useState, useEffect, createContext} from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = (props) => {
    const [productos, setProductos] = useState([])
    const [menu, setMenu] = useState(false)
    const [carrito, setCarrito] = useState([])
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [categorias,setCategorias] = useState([])
    const [paises,setPaises] = useState([]);
    const [productpais, setProductpais] = useState([]);
    const [productocat, setProductocat] = useState([]);
    const [detallescat, setDetallescat] = useState({
      id:'',
      nombre:'',
      pub_date:'',
      img:''
    });
    const [detallespais, setDetallespais] = useState({
      id:'',
      nombre:'',
      pub_date:'',
      img:''
    });

    const [historial,setHistorial] = useState([])

    useEffect(()=>{
        peticionGet();
        getCategorias();
        getPaises();
    },[])

    const getHistorial = async (cliente) => {
      await axios.get('http://localhost:8081/api/ventas/'+cliente+'/').then(response =>{
        const history = response.data
        setHistorial(history);
        console.log(historial); 
      })
    }


    const peticionGet = () =>{
        axios.get('http://localhost:8081/api/products/').then(response =>{
          const products = response.data
          setLoading(!loading)
          setProductos(products)
        })
    }

 
    const getCategorias = () =>{
        axios.get('http://localhost:8081/api/categories/').then(response=>{
          const category = response.data
          setCategorias(category)
          console.log(categorias)
        })
    }
    const getPaises = () => {
      axios.get('http://localhost:8081/api/countries/').then(response =>{
        const country = response.data
        setPaises(country)
      })
    }

    const filtroPais = async (id) =>{
      await axios.get('http://localhost:8081/api/products/pais/'+id+'/').then(response =>{
        const prodPais = response.data
        setProductpais(prodPais)
        console.log(productpais)
      })
    }
    const filtroCategorias = async (id) =>{
      await axios.get('http://localhost:8081/api/products/categoria/'+id+'/').then(response =>{
        const catProd = response.data
        setProductocat(catProd);
      })
    }
    const detallCategoria = async(id) => {
      await axios.get('http://localhost:8081/api/categories/'+id+'/').then(response =>{
        const detCat = response.data
        setDetallescat(detCat)
        console.log(detCat)
      })
    }

    const detallPais = async(id) => {
      await axios.get('http://localhost:8081/api/countries/'+id+'/').then(response =>{
        const detPais = response.data
        setDetallespais(detPais)
        console.log(detPais)
      })
    }
    const addCarrito = (id)=>{
      const check = carrito.every(item =>{
        return item.id !== id;
      })
      if(check){
        const data = productos.filter(producto =>{
          return producto.id === id
        })
        setCarrito([...carrito,...data])
      }else{
        alert("El producto ya se encuentra en el carrito")
      }
    }
    useEffect(()=>{
      localStorage.setItem('dataCarrito',JSON.stringify(carrito))
      JSON.parse(localStorage.getItem('dataCarrito'))
    },[carrito])
    
    useEffect(()=>{
        const dataCarrito = JSON.parse(localStorage.getItem('dataCarrito'))
        if(dataCarrito){
            setCarrito(dataCarrito)
        }
    },[])

    

    useEffect(() =>{
      const getTotal = () =>{
        const res = carrito.reduce((prev, item) =>{
          return prev + (item.precio * item.cantidad)
        },0)
        setTotal(res)
      }
      getTotal()
    },[carrito])

    const value = {
        productos:[productos],
        loading:[loading,setLoading],
	    	menu: [menu, setMenu],
        addCarrito:addCarrito,
        carrito:[carrito,setCarrito],
        total:[total,setTotal],
        categorias:[categorias],
        paises: [paises],
        filtroPais:filtroPais,
        productpais: [productpais],
        filtroCategorias:filtroCategorias,
        productocat:[productocat],
        detallCategoria:detallCategoria,
        detallescat:[detallescat],
        detallPais:detallPais,
        detallespais:[detallespais],
        getHistorial:getHistorial,
        historial:[historial],
	  }
    
    return(
        <DataContext.Provider value={value}>
			{props.children}
		</DataContext.Provider>
    )
}
