window.onload = () => {

    const $ = (e) => document.querySelector(e);

    let peliID
    let elegir = confirm('deseas editar o eliminar una pelicula? si seleciona cancel le habilitara a crear una pelicula')
    if (elegir == true) {
        let msg = prompt('escriba le id de la pelicula que desea modificar')
        if (msg) {
            peliID = +msg
        }
    }
    console.log('peli selecionado ' + peliID)
    
    
    const getMovie = async () => {
        try {
          if (elegir) {
            let apiUrl =  `http://localhost:3031/api/movies/${peliID}`;
            let reponse = await fetch(apiUrl);
            let result = await reponse.json();
            console.log(result);
            cargarDato(result.data)

          }else{
            crearPeli()
          }
        } catch (error) {
          console.log(error);
        }
      }

      let form = $('#form')
      let titulo = $('#title')
      let premios = $('#rating')
      let calificacion = $('#awards')
      let fechaCreacion = $('#release_date')
      let duracion = $('#length')
      

      let btnEditar = $('#btnEditar')
      let btnAgregar = $('#btnAgregar')
      let btnEliminar = $('#btnEliminar')

      let cargarDato = async (data) => {
        let fecha = data.release_date
        let id = data.id
        let nuevaFecha = fecha.substring(0, 10)

        titulo.value = data.title
        premios.value = data.awards
        calificacion.value = data.rating
        fechaCreacion.value = nuevaFecha
        duracion.value = data.length


        btnEditar.onclick = async (e) => {
        
            let urlEditar = `http://localhost:3031/api/movies/update/${id}`

            let peliActualizado = {
                title : titulo.value,
                awards : premios.value,
                rating : calificacion.value,
                release_date : new Date,
                length : duracion.value,
                genre_id : 2
            }
            console.log(peliActualizado);

            e.preventDefault();
            
            let confirmar = confirm('Estas seguro de editar la pelicula ' + titulo.value + ' ?')
            if (confirmar) {
                let peliUpdate = await fetch(urlEditar, {
                    method: 'PUT',
                    body: JSON.stringify(peliActualizado),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                let result = await peliUpdate.json()

                console.log(urlEditar)
                
                alert('la pelicula se edito correctamente ' + result)
            }
        }
    
        btnEliminar.onclick = async (e) => {
            let urlELiminar = `http://localhost:3031/api/movies/delete/${id}`
            e.preventDefault();
            let respuesta = confirm('estas seguro que desea eliminar este elemnto?')
            console.log('click ' + id);
            console.log(urlELiminar);
            if (respuesta == true) {
                let eliminarPeli = await fetch(urlELiminar, {
                    method: 'DELETE'
                })
                let result = await eliminarPeli.data
            
                alert('La pelicula ' + titulo.value + ' fue eliminado ')
            }
        }
      }

      let crearPeli = async () => {
        let urlCrear = 'http://localhost:3031/api/movies/create'
        
        
        btnAgregar.onclick = async (e) => {

            let nuevaPeli = {
                title : titulo.value,
                awards : premios.value,
                rating : calificacion.value,
                release_date : new Date,
                length : duracion.value,
                genre_id : 1
            }

            console.log(nuevaPeli);
            e.preventDefault();
            
            let confirmar = confirm('Estas seguro de agregar la pelicula ' + titulo.value + ' ?')
            if (confirmar) {
                let peliCreate = await fetch(urlCrear, {
                    method: 'POST',
                    body: JSON.stringify(nuevaPeli),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                let result = await peliCreate.json()

                console.log(urlCrear)
                
                alert('La pelicula se agrego correctamente ' + result)
            }
        }
      }


    getMovie();
}