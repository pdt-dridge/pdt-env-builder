import React, { Component } from 'react'
import './Alert.css';
import {
  Button,
  // Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
} from 'semantic-ui-react'


const options = [
  { key: 'NSW', text: 'NSW', value: 'NSW' },
  { key: 'VIC', text: 'VIC', value: 'VIC' },
  { key: 'QLD', text: 'QLD', value: 'QLD' },
]

class AlertForm extends Component {
  state = { summary: '', description: '', region: '', priority: ''}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { summary, description, region, priority } = this.state

    const data = JSON.stringify({ 
      payload : {
        summary : summary,
        source : "Customer Incident Form",
        severity : "error",
        custom_details : {
          description : description,
          region : region,
          priority : priority
        }
      },
      routing_key: "ROUTING_KEY",
      event_action: "trigger"
    });

    /*
    fetch('https://events.pagerduty.com/v2/enqueue', {
      method: 'POST',
      body: data,
    });
    */

    fetch('https://webhook.site/a92bb3c3-9095-4f24-b92d-2c49cbbb6aca', {
      method: 'POST',
      body: data,
    });

    this.setState({ summary: '', description: '', region: '', priority: ''})

}

  render() {
    const { summary, description, region, priority } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
          <Form.Field
            control={Input}
            name='summary'
            value={summary}
            label='Incident Summary'
            placeholder='Enter Incident Summary'
            onChange={this.handleChange}
            required
            //error={{
            //  content: 'Please enter a valid email address',
            //  pointing: 'above',
            //}}
          />
          <Form.Field
            control={TextArea}
            name='description'
            value={description}
            label='Incident Details'
            placeholder='Enter Incident Details'
            onChange={this.handleChange}
            required
            //error={{
            //  content: 'Please enter a valid email address',
            //  pointing: 'above',
            //}}
          />
          <Form.Field
            control={Select}
            name='region'
            value={region}
            label='Affected Region'
            options={options}
            placeholder='Select Region'
            onChange={this.handleChange}
            required
          />
          <Form.Group inline>
          <label>Priority</label>
          <Form.Field
            control={Radio}
            name='priority'
            label='P1'
            value='1'
            checked={priority === '1'}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            label='P2'
            name='priority'
            value='2'
            checked={priority === '2'}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            label='P3'
            name='priority'
            value='3'
            checked={priority === '3'}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Field control={Button}>Submit Alert</Form.Field>
      </Form>
    )
  }

}

export default AlertForm;