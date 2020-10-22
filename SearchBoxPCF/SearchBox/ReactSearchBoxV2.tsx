import * as React from 'react';
import { Pivot, PivotItem, Fabric, initializeIcons,IColumn, DetailsList, SelectionMode, DetailsListLayoutMode,Selection } from 'office-ui-fabric-react';
import { Autocomplete, ISuggestionItem } from './Autocomplete';


export interface IDetailsListCompactItem {
  key: number;
  displayValue: string;
  searchValue: string;
}

initializeIcons();

export interface IState {
	value:string;
  json:Array<ISuggestionItem>;
  jsonfavs: Array<IDetailsListCompactItem>;
}

export interface IProps {
	value:string;
  json:Array<ISuggestionItem>;
  jsonfavs: Array<IDetailsListCompactItem>;
  onResult: (value:string) =>void;
  searchTabTitle: string;
  searchTabFavTitle:string;
  listTabFavTitle:string;
  noSuggestionMessage:string;
  searchTitle:string;
}

              


export class ReactSearchBoxV2 extends React.Component<IProps, IState> {
  private _selection: Selection;
   
  private favcolumns: IColumn[];

  constructor(props: Readonly<IProps>) {
      super(props);
      
      this.state = {value:props.value, json:props.json, jsonfavs: props.jsonfavs};
      this.entitySelectHandler = this.entitySelectHandler.bind(this);
      this.searchTextandler = this.searchTextandler.bind(this);
 
      //this._noSuggestionMessage = props.noSuggestionMessage;
      

       //Funciones para favoritos
      this._selection = new Selection({
        onSelectionChanged: () => {
          this.setState({ value: this.getSelectionDetails() })
          this.props.onResult(this.getSelectionDetails());
        },
      });

      this.favcolumns = [
        { key: 'column1', name: this.props.listTabFavTitle, fieldName: 'displayValue', minWidth: 100, maxWidth: 200, isResizable: true }
      ];

    }
  
    //Funciones para el seartchbox + suggestbox
  entitySelectHandler = (item: ISuggestionItem): void => {
    this.setState({value: item.searchValue});
    this.props.onResult(item.searchValue);
    
  }
  
  searchTextandler = (item: string): void => {
   this.setState({value: item as string});
  }
  
  //Funciones para el favorito
  getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();
    
    if (selectionCount ==1) return (this._selection.getSelection()[0] as IDetailsListCompactItem).searchValue;
    return "";
  }
 
	 
  render() {

    return (
       <Fabric>
        <Pivot>
        <PivotItem headerText={this.props.searchTabTitle}>
          <Autocomplete
            items={this.state.json}
            searchTitle={this.props.searchTitle}
            suggestionCallback={this.entitySelectHandler}
            searchCallback={this.searchTextandler}
            value = {this.state.value}
            noSuggestionsMessage = {this.props.noSuggestionMessage}
          />
           </PivotItem>
        <PivotItem headerText={this.props.searchTabFavTitle}>
        <DetailsList 
            layoutMode={DetailsListLayoutMode.justified}
            selection={this._selection}
            items={ this.state.jsonfavs } 
            columns={ this.favcolumns }  
            selectionMode= {SelectionMode.single}  
            selectionPreservedOnEmptyClick={true}   
            checkButtonAriaLabel="Row checkbox"       
          /> 
        </PivotItem>
        </Pivot>
       </Fabric>
    );
  }
}
 
