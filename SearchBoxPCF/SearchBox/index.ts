import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactSearchBoxV2, IProps, IDetailsListCompactItem } from './ReactSearchBoxV2';
import { ISuggestionItem } from './Autocomplete';
 
// TEST DATA
const searchData: ISuggestionItem[] = [
	{ key: 1, displayValue: 'Alabama', searchValue: 'Alabama' },
	{ key: 2, displayValue: 'Alaska', searchValue: 'Alaska' },
	{ key: 3, displayValue: 'Arizona', searchValue: 'Arizona' },
	{ key: 4, displayValue: 'Arkansas', searchValue: 'Arkansas' },
	{ key: 5, displayValue: 'California', searchValue: 'California' },
	{ key: 6, displayValue: 'Colorado', searchValue: 'Colorado' },
	{ key: 7, displayValue: 'Connecticut', searchValue: 'Connecticut' },
	{ key: 8, displayValue: 'Delaware', searchValue: 'Delaware' },
	{ key: 9, displayValue: 'Florida', searchValue: 'Florida' },
	{ key: 10, displayValue: 'Georgia', searchValue: 'Georgia' },
	{ key: 11, displayValue: 'Hawaii', searchValue: 'Hawaii' },
	{ key: 12, displayValue: 'Idaho', searchValue: 'Idaho' },
	{ key: 13, displayValue: 'Illnois', searchValue: 'Illnois' },
	{ key: 14, displayValue: 'Indiana', searchValue: 'Indiana' },
	{ key: 15, displayValue: 'Iowa', searchValue: 'Iowa' },
	{ key: 16, displayValue: 'Kansas', searchValue: 'Kansas' },
	{ key: 17, displayValue: 'Kentucky', searchValue: 'Kentucky' },
	{ key: 18, displayValue: 'Louisiana', searchValue: 'Louisiana' },
	{ key: 19, displayValue: 'Maine', searchValue: 'Maine' },
	{ key: 20, displayValue: 'Maryland', searchValue: 'Maryland' },
	{ key: 21, displayValue: 'Massachusetts', searchValue: 'Massachusetts' },
	{ key: 22, displayValue: 'Michigan', searchValue: 'Michigan' },
	{ key: 23, displayValue: 'Minnesota', searchValue: 'Minnesota' },
	{ key: 24, displayValue: 'Mississippi', searchValue: 'Mississippi' },
	{ key: 25, displayValue: 'Missouri', searchValue: 'Missouri' },
	{ key: 26, displayValue: 'Montana', searchValue: 'Montana' },
	{ key: 27, displayValue: 'Nebraska', searchValue: 'Nebraska' },
	{ key: 28, displayValue: 'Nevada', searchValue: 'Nevada' },
	{ key: 29, displayValue: 'New Hampshire', searchValue: 'New Hampshire' },
	{ key: 30, displayValue: 'New Jersey', searchValue: 'New Jersey' },
  ];
 
// TEST DATA
  const searchfavdata: IDetailsListCompactItem[] = [
	{ key: 1, displayValue: 'Alabama', searchValue: 'Alabama' },
	{ key: 2, displayValue: 'Alaska', searchValue: 'Alaska'},
  ];
  
 

export class SearchBoxPCF implements ComponentFramework.StandardControl<IInputs, IOutputs> {


	private _value: string;
	private _notifyOutputChanged:() => void;
	private _container: HTMLDivElement;
	private _json:string|null;
	private _noSuggestions: string = "Sin Sugerencias";
	private _searchTabTitle: string ="Búsqueda rápida";
	private _searchTabFavTitle: string = "Favoritos";
	private _listTabFavTitle:string ="Favorito";
	private _searchTitle ="Buscar ...";


	private props:IProps = { value:"", json:searchData, jsonfavs: searchfavdata, onResult: this.notifyChange.bind(this), searchTabTitle: this._searchTabTitle, searchTabFavTitle:this._searchTabFavTitle, listTabFavTitle:this._listTabFavTitle, noSuggestionMessage:this._noSuggestions, searchTitle: this._searchTitle };
	
 
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this._notifyOutputChanged = notifyOutputChanged;
		this._container = document.createElement("div");
		
		container.appendChild(this._container);

		this.getConfiguration(context);

	}
	
	private getConfiguration(context: ComponentFramework.Context<IInputs>)
	{

		if(context.parameters.noSuggestions.raw !='val' && context.parameters.noSuggestions.raw !=null)
		this._noSuggestions = context.parameters.noSuggestions.raw as string;

		
	   if(context.parameters.searchTabTitle.raw !='val' && context.parameters.searchTabTitle.raw !=null)
	   this._searchTabTitle = context.parameters.searchTabTitle.raw as string;

	   
	   if(context.parameters.searchTabFavTitle.raw !='val' && context.parameters.searchTabFavTitle.raw !=null)
		this._searchTabFavTitle = context.parameters.searchTabFavTitle.raw as string;

		
	   if(context.parameters.listTabFavTitle.raw !='val' && context.parameters.listTabFavTitle.raw !=null)
	   this._listTabFavTitle = context.parameters.listTabFavTitle.raw as string;

	   if(context.parameters.searchTitle.raw !='val' && context.parameters.searchTitle.raw !=null)
	   this._searchTitle = context.parameters.searchTitle.raw as string;

	   this._value = (context.parameters.ExistingValue.raw =='val') ? "" : context.parameters.ExistingValue.raw as string;
	   this._json = (context.parameters.Json.raw==null || context.parameters.Json.raw=='val') ? null: context.parameters.Json.raw;
   

	}
	notifyChange(value:string)
	{
		this._value = value;
		this._notifyOutputChanged();

	}
	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		
		this._value = (context.parameters.ExistingValue.raw =='val') ? "" : context.parameters.ExistingValue.raw as string;
		this._json = (context.parameters.Json.raw==null || context.parameters.Json.raw=='val') ? null: context.parameters.Json.raw;
		this.props.value = this._value;
		this.props.listTabFavTitle = this._listTabFavTitle;
		this.props.noSuggestionMessage = this._noSuggestions;
		this.props.searchTabFavTitle = this._searchTabFavTitle;
		this.props.searchTabTitle = this._searchTabTitle;
		this.props.searchTitle = this._searchTitle;

	 
		//Add logic to query your JSON data or add another field as input
		
		if(this._json) { 
            //JSON Input Sample
			//[{"key":1,"displayValue":"Alabama","searchValue":"Alabama","fav":true},{"key":2,"displayValue":"Montreal","searchValue":"Montreal","fav":false}]
			this.splitData(this._json);
		} 
		else
		{ //demo data.
			this.props.json = searchData;
			this.props.jsonfavs = searchfavdata;
		}
		
		ReactDOM.render(
			React.createElement(ReactSearchBoxV2, this.props)
			, this._container
		);
	}
	
	private splitData(json:string)
	{
		
		let searchjson = JSON.parse(json);
		
		let searchdata: ISuggestionItem[] = searchjson.reduce(function(filtered:ISuggestionItem[], value:any) {	
			   var someNewValue = { key: value.key as number, displayValue: value.displayValue, searchValue: value.searchValue }
			   filtered.push(someNewValue);
			return filtered;
		  }, []);

		  let searchfavdata: IDetailsListCompactItem[] = searchjson.reduce(function(filtered: IDetailsListCompactItem[], value:any) {
			if (value.fav as boolean) {
			   var someNewValue = { key: value.key as number, displayValue: value.displayValue, searchValue: value.searchValue }
			   filtered.push(someNewValue);
			}
			return filtered;
		  }, []);

		  this.props.json = searchdata && searchdata.length > 0 ? searchdata: new Array<ISuggestionItem>();
		  this.props.jsonfavs = searchfavdata && searchfavdata.length > 0 ? searchfavdata: new Array<IDetailsListCompactItem>();

	}
	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			ExistingValue : this._value
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		ReactDOM.unmountComponentAtNode(this._container);
	}
}