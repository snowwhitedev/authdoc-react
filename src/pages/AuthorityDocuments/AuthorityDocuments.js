import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchGeographyHierarchyStart,
  fetchSMHierarchyStart,
  addDocumentToSelected,
  removeDocumentFromSelected,
  filterDocuments,
  setExpandedNodesToggle
} from '../../store/actions/documentList';

import { HIERARCHY_GEOGRAPHY, HIERARCHY_SUBJECT_MATTER } from '../../store/constant';

import { makeStyles } from "@material-ui/core/styles";
import { Box, TextField, Button, Divider, Typography, Checkbox, CircularProgress, Dialog } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import SearchIcon from '@material-ui/icons/Search';

import DocumentTree from '../../components/DocumentTree';
import AuthorityDocumentCard from '../../parts/AuthorityDocumentCard';
import './AuthorityDocuments.css';
import styles from './styles';

const useStyles = makeStyles(
  {
    hierarchyOptionRoot: {
      width: '160px',
      '&$selected': {
        color: '#ffffff',
        backgroundColor: '#3f51b5'
      }
    },
    selected: {}
  }
)

const AuthorityDocuments = () => {
  const classes = useStyles();
  const [searchKey, setSearchKey] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);
  const [hierarchy, setHierarchy] = useState(HIERARCHY_GEOGRAPHY);
  const [openCardDlg, setOpenCardDlg] = useState(false);
  const [cardDocId, setCardDocId] = useState();
  const dispatch = useDispatch();

  const {
    geographyTreeList,
    selectedDocuments,
    expandedTreeNodes,
    filteredTreeNodes,
    isLoadingStatus,
  } = useSelector((state) => state.documentList);
  
  const handleHierarchy = async (event, newHierarchy) => {
    setHierarchy(newHierarchy);
    switch (newHierarchy) {
      case HIERARCHY_GEOGRAPHY:
        dispatch(fetchGeographyHierarchyStart({ isFiltering }));
        break;
      case HIERARCHY_SUBJECT_MATTER:
        dispatch(fetchSMHierarchyStart({ isFiltering }));
        break;
      default:
        break;
    }
  };

  const onSelectDocument = (doc, checked) => {
    if (checked) {
      dispatch(addDocumentToSelected(doc))
    } else {
      dispatch(removeDocumentFromSelected(doc))
    } 
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleFilterDocuments();
    }
  }

  const handleChangeSearchKey = (e) => {
    setSearchKey(e.target.value);
    if (e.target.value === '') {
      setIsFiltering(false);
      dispatch(filterDocuments({ searchKey: '', hierarchy }));
    }
  }

  const onShowDocumentCard = (docId) => {
    setCardDocId(docId);
    setOpenCardDlg(true);
  }

  const handleFilterDocuments = () => {
    searchKey === '' ? setIsFiltering(false) : setIsFiltering(true);
    dispatch(filterDocuments({ searchKey, hierarchy }));
  }
  
  const handleTreeToggle = (e, nodes) => {
    dispatch(setExpandedNodesToggle({ nodes }));
  }

  useEffect(() => {
    dispatch(fetchGeographyHierarchyStart({ isFiltering }));
  }, []);

  return (
    <>
      <Box width='100%' mt={8} display="flex" p={2} boxSizing="border-box">
        <TextField
          placeholder="Search Authority Documents"
          size="small"
          type="search"
          variant="outlined"
          style={{ flexGrow: 1 }}
          onChange={(e) => handleChangeSearchKey(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <Button
          endIcon={<SearchIcon />}
          style={{ textTransform: 'capitalize' }}
          onClick={handleFilterDocuments}
        >
          Click to Search
        </Button>
      </Box>
      <Divider />
      <Box display='flex' alignItems="center" p={2} py={1}>
        <Typography color="secondary" variant="h5" style={{marginRight: '20px'}} >Or show hierarchy by</Typography>
        <ToggleButtonGroup
          value={hierarchy}
          exclusive
          onChange={handleHierarchy}
          aria-label="text alignment"
        >
          <ToggleButton value={HIERARCHY_GEOGRAPHY} classes={{root: classes.hierarchyOptionRoot, selected: classes.selected}}>
            GEOGRAPHY
          </ToggleButton>
          <ToggleButton value={HIERARCHY_SUBJECT_MATTER} classes={{root: classes.hierarchyOptionRoot, selected: classes.selected}}>
            SUBJECT MATTER
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <div className="documents">
        <div className="document-tree">
          <p className="tree-label">Categories and Authority Documents</p>
          <DocumentTree
            treeData={geographyTreeList}
            expandedTreeNodes={expandedTreeNodes}
            filteredTreeNodes={filteredTreeNodes}
            isFiltering={isFiltering}
            handleNodeToggle={handleTreeToggle}
            handleSelectDocument={onSelectDocument}
            handleShowDocumentCard={onShowDocumentCard}
          />
        </div>
        <div className="selected-list">
          <p className="tree-label">
            <span>Selected List</span>
            <span>Remove</span>
          </p>
          <ul className="selected-documents-list">
            { selectedDocuments && selectedDocuments.map((item) => {
              return (
                <li key={item.id} className="selected-item">
                  <span>{item.name}</span>
                  <Checkbox
                    defaultChecked
                    color="primary"
                    size="small"
                    onChange={() => onSelectDocument(item, false)}
                  />
                </li>
              )
            }) }
          </ul>
        </div>
      </div>
      {
        openCardDlg &&
        <Dialog style={{maxWidth: '100%'}} className="ad-card" aria-labelledby="customized-dialog-title" onClose={() => setOpenCardDlg(false)} open={openCardDlg}>
          <AuthorityDocumentCard onClose={() => setOpenCardDlg(false)} cardDocId={cardDocId} />
        </Dialog>
      }
      
      {
        isLoadingStatus && 
        <>
          <div className="spinner-overlay">
            <div className="spinner-wrapper">
              <CircularProgress size={80} />
            </div>
          </div>
        </>
      }
      <style jsx>{styles}</style>
    </>
  )
}

export default AuthorityDocuments;
