# SearchBoxPCF
A Search Box PCF control based on React and Office UI

The basic idea of this control is to be an addition to subject trees or entities with hierarchies that grow a lot and help users to find the option or reduce long list controls as the example that is provided with the control.

Basic Configuration

* ExistingValue: This is bound field we will use as input/output in Dynamics. No need for initial values.
* Json: This is the JSON data with the configuration. If we dont include data, sample data is shown.
* SearchTabTitle: Title for the SearchBox Tab.
* SearchTabFavTitle: Title for the Favourites Tab.
* listTabFavTitle: Title of the Column for the Favourites.
* noSuggestions: Message that will be shown by the Searchbox control when nothing is found.
* searchTitle: Message inside the SearchBox like "Search..."

JSON Format

[{"key":1,"displayValue":"Alabama","searchValue":"Alabama","fav":true},{"key":2,"displayValue":"Montreal","searchValue":"Montreal","fav":false}]

Key: unique identifier
displayValue: The value in the list or search
SearchValue: The selected value.
Fav: Boolean value that indicates if this entry should be in the Favourites Tab.
