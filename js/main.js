'use strict';

//Funcion que carga Muuri
const grid = new Muuri('.grid', {
  layout: {
    rounding: false
  }
});

window.addEventListener('load', () => {
  grid.refreshItems().layout();
  //Mostrar las imagenes cuando esten listas
  document.querySelector('.grid').classList.add('grid-imagenes-cargadas');

  //Filtrado de imagenes por categoria
  const enlaces = document.querySelectorAll('.categorias a');
  enlaces.forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault();
      //Eliminar el activo de un enlace y colocarlo en el enlace clikeado
      enlaces.forEach(enlace => {
        enlace.classList.remove('activo');
      });
      event.target.classList.add('activo');
      //Obtener el html del enlace
      const categoria = event.target.innerHTML.toLowerCase();
      //Usando el metodo de filtrado de Muuri
      categoria === 'todos'
        ? grid.filter('[data-categoria]')
        : grid.filter(`[data-categoria="${categoria}"]`);
    });
  });

  //Agregamos el listener para la barra de busqueda
  document.querySelector('#barra-busqueda').addEventListener('input', event => {
    const busqueda = event.target.value;
    grid.filter(item => item.getElement().dataset.etiquetas.includes(busqueda));
  });
});
