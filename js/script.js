$(document).ready(function() {

function randomString() {
	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	var str = '';
	for (i = 0; i < 10; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
};
//Klasa Column
function Column(name) {
	var self = this; // przyda się dla funkcji zagnieżdżonych

	this.id = randomString();
	this.name = name;
	this.$element = createColumn();

	function createColumn() {
	// Tworzenie elementów kolumny
		var $column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('btn-delete').text('x');
		var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');

	//Podpinanie zdarzeń
	$columnDelete.click(function(){
		self.removeColumn();
	});

	$columnAddCard.click(function(){
		self.addCard(new Card(prompt('Wpisz nazwę karty')));
	});

	//Konstruowanie kolumny
	$column.append($columnTitle)
			.append($columnDelete)
			.append($columnAddCard)
			.append($columnCardList);
	return $column;
	
	}; 
};

Column.prototype = {
	addCard: function(card) {
		this.$element.children('ul').append(card.$element);
	},
	removeColumn: function() {
		this.$element.remove();
	}
};

//Klasa Card
function Card(description) {
	var self = this;

	this.is = randomString();
	this.description = description;
	this.$element = createCard();

	function createCard () {
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		var $cardDelete = $('<button>').addClass('btn-delete').text('x');

	$cardDelete.click(function(){
        self.removeCard();
	});

	$card.append($cardDelete)
		.append($cardDescription);
	return $card;
	};
};

Card.prototype = {
	removeCard: function() {
		this.$element.remove();
	}
};

// Obiekt tablicy
var board = {
    name: 'Tablica Kanban',
    addColumn: function(column) {
    	this.$element.append(column.$element);
    	initSortable();
    },
    $element: $('#board .column-container')
};

//Przenoszenie elementów/kart na stronie
function initSortable() {
	$('.column-card-list').sortable({
		connectWith: '.column-card-list',
		placeholder: 'card-placeholder'
	}).disableSelection();
};

//Wyłączanie zaznaczania tekstu na przenoszonych kartach
function initSortable() {
	$('.column-card-list').sortable({
		connectWith: '.column-card-list',
		placeholder: 'card-placeholder'
    }).disableSelection();
 };

 //Podpiananie pod przycisk tablicy zdarzenia wrzucania nowej kolumny
 $('.create-column').click(function(){
 	var name = prompt('Wpisz nazwę kolumny');
 	var column = new Column(name);
 	board.addColumn(column);
 });

//Tworzenie podstawowych elementów kanbana
// Tworzenie kolumn
var todoColumn = new Column('Do zrobienia');
var doingColumn = new Column('W trakcie');
var doneColumn = new Column('Skończone');

// Dodawanie kolumn do tablicy
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

// Tworzenie nowych egzemplarzy kart
var card1 = new Card('Nowe zadanie');
var card2 = new Card('Stworzyć tablicę kanban');

// Dodawanie kart do kolumn
todoColumn.addCard(card1);
doingColumn.addCard(card2);

});