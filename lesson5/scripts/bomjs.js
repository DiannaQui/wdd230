const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('.list');


button.addEventListener('click', () => {
  const chapter = input.value;
  input.value = '';

  const listChapter = document.createElement('li');
  const listText = document.createElement('p');
  const listButton = document.createElement('button');

  listChapter.appendChild(listText);
  listText.textContent = chapter;

  listChapter.appendChild(listButton)
  listButton.textContent = '❌';
  list.appendChild(listChapter);

  listButton.addEventListener('click', () => {
    list.removeChild(listChapter);
  });

  input.focus();

})