const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let ExcelUploadWindow;
let ohlcWindow;

//Listen for the app to be ready
app.on('ready', function(){

	//cretae new window
	mainWindow = new BrowserWindow({
		width : 1200,
		height : 700,
		webPreferences :{
			nodeIntegration: false,
			preload: path.join(__dirname, 'preload.js')
		}
	});
	//load html into window
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'app/index.html'),
		protocol:'file:',
		slashes: true

	}));
	// Quit app when closed
	mainWindow.on('closed', function(){
		app.quit();
	});

	//Build menu from template
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	//Insert menu
	Menu.setApplicationMenu(mainMenu);

});

// Handle create excel upload window
function createExcelUploadWindow(){
	//cretae new window
	excelUploadWindow = new BrowserWindow({
		width: 450,
		height: 300,
		title: 'Upload Stock Excel File'
	});
	//load html into window
	excelUploadWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'app/excelUploadWindow.html'),
		protocol:'file:',
		slashes: true

	}));

	//Clear excelUploadWindow
	excelUploadWindow.on('close', function(){
		excelUploadWindow = null;
		mainWindow.reload()
	});
}

//OHCL Window
function ohlcWindowViewer(){
	//cretae new window
	ohlcWindow = new BrowserWindow({
		width: 1200,
		height: 700,
		title: 'OHCL Graph'
	});
	//load html into window
	ohlcWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'ohcl.html'),
		protocol:'file:',
		slashes: true

	}));
	//Clear ohlcWindow
	ohlcWindow.on('close', function(){
		ohlcWindow = null;
	});
}


//create menu template
const mainMenuTemplate = [
	{
		label:'File',
		submenu:[
			{
				label: 'Upload Stock Excel',
				click(){
					createExcelUploadWindow();
				}
			},
			{
				label: 'Quit',
				accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
				click(){
					app.quit();
				}
			},


		]
	}
];

// //if Mac, add empty object to menu
// if(process.platform == 'darwin'){
// 	mainMenuTemplate.unshift({});
// }

//Add developer tools item if not in production
if(process.env.NODE_ENV !== 'production'){
	mainMenuTemplate.push({
		label: 'Developer',
		submenu:[
		{
			label: 'Toggle Devtools',
			accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
			click(item, focusedWindow){
				focusedWindow.toggleDevTools();
			}
		},
		{
			role: 'reload'
		}
		]

	})
}