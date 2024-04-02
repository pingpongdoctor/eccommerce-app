import { LaunchIcon } from '@sanity/icons';

const ExternalLinkRenderer = (props: any) => (
  <span>
    {props.renderDefault(props)}
    <a contentEditable={false} href={props.value.href}>
      <LaunchIcon />
    </a>
  </span>
);

export default ExternalLinkRenderer;
