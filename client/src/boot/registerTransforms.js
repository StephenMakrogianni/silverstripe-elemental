import Injector from 'lib/Injector';
import readOneBlockQuery from 'state/history/readOneBlockQuery';
import HistoricElementViewFactory from 'components/HistoricElementView/HistoricElementView';
import revertToBlockVersionMutation from 'state/history/revertToBlockVersionMutation';
import readBlocksForPageQuery from 'state/editor/readBlocksForPageQuery';

export default () => {
  Injector.transform(
    'elemental-fieldgroup',
    (updater) => {
      updater.component(
        'FieldGroup.HistoryViewer.VersionDetail',
        HistoricElementViewFactory,
        'HistoricElement'
      );
    },
    {
      after: 'field-holders'
    }
  );

  Injector.transform(
    'elements-history',
    (updater) => {
      // Add content block history to the HistoryViewer
      updater.component(
        'HistoryViewer.Form_ItemEditForm',
        readOneBlockQuery,
        'ElementHistoryViewer'
      );
    }
  );

  Injector.transform(
    'blocks-history-revert',
    (updater) => {
      // Add block element revert GraphQL mutation to the HistoryViewerToolbar
      updater.component(
        'HistoryViewerToolbar.VersionedAdmin.HistoryViewer.Element.HistoryViewerVersionDetail',
        revertToBlockVersionMutation,
        'BlockRevertMutation'
      );
    }
  );

  Injector.transform(
    'cms-element-editor',
    (updater) => {
      // Add GraphQL query for reading elements on a page for the ElementEditor
      updater.component(
        'ElementList',
        readBlocksForPageQuery,
        'PageElements'
      );
    }
  );
};
