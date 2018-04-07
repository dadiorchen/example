import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));


const {Setting} = require('../component/Setting.js')
const {Search} = require('../component/Search.js')
storiesOf('Todo',module)
	.add('Setting',() => 
			<Setting
				autoSearch={false}
				displayMode={0}
				displayModeUpdate={() => console.log('display mode update')}
				autoSearchUpdate={() => console.log('auto search update')}
			/>
		)
	.add('Search',() =>
			<Search
				status={-1}
				changeKeyword={() => {console.log('change keyword')}}
				changeStatus={() => {console.log('change status')}}

			/>)
