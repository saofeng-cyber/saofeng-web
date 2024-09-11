import { type Config, driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useDesign } from '@/hooks/web/useDesign';

const { variables } = useDesign();

export const useGuide = (options?: Config) => {
  const driverObj = driver(
    options || {
      showProgress: true,
      nextBtnText: 'common.nextLabel',
      prevBtnText: 'common.prevLabel',
      doneBtnText: 'common.doneLabel',
      steps: [
        {
          element: `#${variables.namespace}-menu`,
          popover: {
            title: 'common.menu',
            description: 'common.menuDes',
            side: 'right'
          }
        },
        {
          element: `#${variables.namespace}-tool-header`,
          popover: {
            title: 'common.tool',
            description: 'common.toolDes',
            side: 'left'
          }
        },
        {
          element: `#${variables.namespace}-tags-view`,
          popover: {
            title: 'common.tagsView',
            description: 'common.tagsViewDes',
            side: 'bottom'
          }
        }
      ]
    }
  );

  return {
    ...driverObj
  };
};
