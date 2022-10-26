new gridjs.Grid({
    columns: ['Titulo','Genero', 'Precio', 'Fecha'],
    server: {
      url: 'http://localhost:8082',
      then: data => data.map(videojuego => 
        [videojuego.inputTituloVideojuego, videojuego.Genero, videojuego.inputPrecio, videojuego.Fecha]
      )
    } 
}).render(document.getElementById("wrapper"));