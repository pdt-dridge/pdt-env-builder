import React, { Component } from 'react'
import {
  Button, Form, Input, Grid, Segment
} from 'semantic-ui-react'


class EnvBuilderForm extends Component {
  state = { subdomain: '', apikey: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { subdomain, apikey, } = this.state

    const data = JSON.stringify({ 
        PD_SUBDOMAIN : subdomain,
        PD_API_KEY   : apikey
    });

    /*
    fetch('https://events.pagerduty.com/v2/enqueue', {
      method: 'POST',
      body: data,
    });
    */

    fetch('https://webhook.site/fb8fe54d-1515-4fd3-b008-63def2efe124', {
      method: 'POST',
      body: data,
    });

    this.setState({ subdomain: '', apikey: ''})
}

  render() {
    const { subdomain, apikey } = this.state

    return (

      <Form onSubmit={this.handleSubmit}>
        <Segment>
          <Grid columns={1} relaxed='very'>
            <Grid.Column>
              <Form.Field
                control={Input}
                name='subdomain'
                value={subdomain}
                label='PagerDuty Subdomain Name'
                placeholder='e.g. pdt-automation'
                onChange={this.handleChange}
                required
              />
              <Form.Field
                control={Input}
                name='apikey'
                value={apikey}
                label='PagerDuty API Key'
                placeholder='Enter PagerDuty API Key'
                onChange={this.handleChange}
                required
              />
              
            </Grid.Column>
          </Grid>
        </Segment> 
        <Form.Field control={Button}>Let's Go!</Form.Field>
      </Form>
    )
  }
}

export default EnvBuilderForm;
