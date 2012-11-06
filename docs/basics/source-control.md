<!--{
  title: 'Using Source Control with Deployd',
  tags: ['guide']
}-->

## Using Source Control with Deployd

Deployd projects are designed to be committed to version control systems so teams can easily manage the source of their applications. 

### Recommended Ignored Files

You shouldn't commit the `/data` or `.dpd` directories. The files in these directories are environment specific and should be kept out of version control. All other Deployd files should be committed.