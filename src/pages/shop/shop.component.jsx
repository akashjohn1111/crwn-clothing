import React from 'react';
import {Route} from 'react-router-dom';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import {firestore,convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
import {UpdateCollections} from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import {connect} from 'react-redux';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component { 
  state={
    loading:true
  };
   unsubscribeFromSnapshot =null;

   componentDidMount(){
     const {UpdateCollections}=this.props;
     const collectionRef=firestore.collection('collections');
     
    collectionRef.get().then(async snapshot=>{
    const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
     UpdateCollections(collectionsMap);
    this.setState({loading:false});

    });
     

   }
  


  render(){
    const{loading}=this.state;
    const {match}=this.props;
    return(
      <div className='shop-page'>
        <Route  exact path={`${match.path}`}    render={(props) => <CollectionsOverviewWithSpinner isLoading={loading}{...props} /> }/>
        <Route path={`${match.path}/:collectionId`} 
        render={(props) => <CollectionPageWithSpinner isLoading={loading}{...props} /> }/>
      </div>
    );
  }
}

  const mapDispatchToProps=dispatch=>({
    UpdateCollections:collectionsMap=>dispatch(UpdateCollections(collectionsMap))
  });
  
  
      

export default connect(null,mapDispatchToProps)(ShopPage);
